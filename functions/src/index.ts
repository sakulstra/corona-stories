import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import fetch from 'node-fetch'

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
        console.log(original?.image.url)
        const savePath = `storyCover/${context.params.storyId}.jpg`
        admin
            .firestore()
            .collection('stories')
            .doc(context.params.storyId)
            .update({ 'image.url': getStoragePathForSavePath(savePath) })
        return downloadToStorage(savePath, original?.image.url)
    })
