import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import fetch from 'node-fetch'

admin.initializeApp()

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!')
})
/*export const generateSlug = functions.firestore
  .document("stories/{storyId}")
  .onCreate((snap, context) => {
    const value = snap.data();

    if (!value?.title) return;
    return snap.ref.set({
      slug: slugify(value.title)
    });
  });*/

// in order to maintain user privacy, but still be somehow personal we're generating avatars from https://www.thispersondoesnotexist.com/
export const profilePicture = functions.auth.user().onCreate((user) => {
    const url = `avatars/${user.uid}.jpg`
    const file = admin.storage().bucket().file(url)
    admin
        .firestore()
        .collection('users')
        .doc(user.uid)
        .set({
            profileImg: `https://storage.googleapis.com/corona-stories.appspot.com/${url}`,
        })

    return fetch('https://www.thispersondoesnotexist.com/image').then(
        (res: any) => {
            const contentType = res.headers.get('content-type')
            const writeStream = file.createWriteStream({
                metadata: {
                    contentType,
                    source: 'https://www.thispersondoesnotexist.com/',
                },
                predefinedAcl: 'publicRead',
            })
            res.body.pipe(writeStream)
        }
    )
})
