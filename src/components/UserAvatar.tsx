import React, { useEffect, useState } from "react";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import firebase from "firebase";
import { useUser } from "@utils/actions/useUser";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

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

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  },
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

const useStyles = makeStyles({
  dialog: {
    minWidth: 400,
    paddingBottom: 20
  }
});

export default function UserAvatar() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user, setUser, unsetUser } = useUser();

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      setDialogOpen(false);
    });
  }, []);

  const handleDelete = () => {
    firebase
      .auth()
      .signOut()
      .then(unsetUser);
  };

  return (
    <div>
      {user && (
        <Chip
          variant="outlined"
          onDelete={handleDelete}
          avatar={
            <Avatar
              src="https://www.thispersondoesnotexist.com/image"
              style={{ width: 42, height: 42 }}
            />
          }
          label={user.displayName}
        />
      )}
      {!user && (
        <Button variant="outlined" onClick={() => setDialogOpen(true)}>
          login
        </Button>
      )}
      <Dialog
        fullScreen={fullScreen}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>Login</DialogTitle>
        <div className={classes.dialog}>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </Dialog>
    </div>
  );
}
