import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import fetch from 'node-fetch'
import { getSentiments, getSentimentForNumber } from './deepai'

admin.initializeApp()

const downloadToStorage = (
    savePath: string,
    sourceUrl: string
): Promise<void> =>
    fetch(sourceUrl).then((res: any) => {
        const contentType = res.headers.get('content-type')
        const writeStream = admin
            .storage()
            .bucket()
            .file(savePath)
            .createWriteStream({
                metadata: {
                    contentType,
                    source: sourceUrl,
                },
                predefinedAcl: 'publicRead',
            })
        res.body.pipe(writeStream)
    })

const getStoragePathForSavePath = (savePath: string) =>
    `https://storage.googleapis.com/corona-stories.appspot.com/${savePath}`

const median = (values: number[]): number => {
    values.sort((a, b) => a - b)
    let lowMiddle = Math.floor((values.length - 1) / 2)
    let highMiddle = Math.ceil((values.length - 1) / 2)
    return (values[lowMiddle] + values[highMiddle]) / 2
}

// in order to maintain user privacy, but still be somehow personal we're generating avatars from https://www.thispersondoesnotexist.com/
export const profilePicture = functions.auth.user().onCreate((user) => {
    const savePath = `avatars/${user.uid}.jpg`
    admin
        .firestore()
        .collection('users')
        .doc(user.uid)
        .set({
            profileImg: getStoragePathForSavePath(savePath),
        })
    return downloadToStorage(
        savePath,
        'https://www.thispersondoesnotexist.com/image'
    )
})

export const storyImage = functions.firestore
    .document('stories/{storyId}')
    .onCreate((snapshot, context) => {
        const original = snapshot.data()
        const savePath = `storyCover/${context.params.storyId}.jpg`
        admin
            .firestore()
            .collection('stories')
            .doc(context.params.storyId)
            .update({ 'image.url': getStoragePathForSavePath(savePath) })
        return downloadToStorage(savePath, original?.image.url)
    })

const subscribeToTopic = async (uid: string, story: string) => {
    const doc = await admin.firestore().collection('fcmUsers').doc(uid).get()
    if (!doc.data()) return
    admin.messaging().subscribeToTopic(Object.keys(doc.data()?.tokens), story)
}

export const handleCreation = functions.firestore
    .document('stories/{storyId}')
    .onCreate((snapshot, context) => {
        if (!context.auth?.uid) return
        subscribeToTopic(context.auth.uid, context.params.storyId)
    })

export const handleContribution = functions.firestore
    .document('stories/{storyId}')
    .onWrite((change, context) => {
        if (!context.auth?.uid) return
        subscribeToTopic(context.auth.uid, context.params.storyId)
        const data = change.after.data()
        admin.messaging().send({
            topic: context.params.storyId,
            notification: {
                title: data?.title,
                body: 'Someone continued the story!',
            },
            webpush: {
                fcmOptions: {
                    link: `https://corona-stories.now.sh/stories/${context.params.storyId}`,
                },
            },
        })
    })

export const calculateSentiment = functions.firestore
    .document('stories/{storyId}')
    .onWrite(async (change, context) => {
        if (change.after.exists) {
            const changeParts: any[] = change.after.data()?.parts
            const parts = await Promise.all(
                changeParts.map(async (part) => {
                    if (!part.sentiments) {
                        part.sentiments = await getSentiments(part.text)
                    }
                    return part
                })
            )
            const allSentiments = [].concat.apply(
                [],
                parts.map((part) => part.sentiments)
            )
            const sentiment = getSentimentForNumber(median(allSentiments))
            return admin
                .firestore()
                .collection('stories')
                .doc(context.params.storyId)
                .update({ parts, sentiment })
        }
        return
    })
