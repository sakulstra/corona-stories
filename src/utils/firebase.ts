import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'
import '@firebase/messaging'

// Configure Firebase.
const config = {
    apiKey: 'AIzaSyB9M0rMoZtJ0VHyksZO9DGtXBaXcH7E8TI',
    authDomain: 'corona-stories.firebaseapp.com',
    databaseURL: 'https://corona-stories.firebaseio.com',
    projectId: 'corona-stories',
    storageBucket: 'corona-stories.appspot.com',
    messagingSenderId: '579433547134',
    appId: '1:579433547134:web:7542cf74ae12c7dbe1df2f',
    measurementId: 'G-29E766Z3ZV',
}
if (firebase.apps.length === 0) {
    firebase.initializeApp(config)
}

export default firebase
