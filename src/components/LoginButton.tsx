import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyB9M0rMoZtJ0VHyksZO9DGtXBaXcH7E8TI",
  authDomain: "corona-stories.firebaseapp.com",
  databaseURL: "https://corona-stories.firebaseio.com",
  projectId: "corona-stories",
  storageBucket: "corona-stories.appspot.com",
  messagingSenderId: "579433547134",
  appId: "1:579433547134:web:7542cf74ae12c7dbe1df2f",
  measurementId: "G-29E766Z3ZV"
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/signedIn",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

export default function SignInScreen() {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}
