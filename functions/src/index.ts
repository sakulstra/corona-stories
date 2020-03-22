import * as functions from "firebase-functions";
import slugify from "slugify";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
export const generateSlug = functions.firestore
  .document("stories/{storyId}")
  .onCreate((snap, context) => {
    const value = snap.data();

    if (!value?.title) return;
    return snap.ref.set({
      slug: slugify(value.title)
    });
  });
