import React, { useState } from "react";
import Router from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ImageSelector from "@components/ImageSelector";
import firebase from "@utils/firebase";
import { Story } from "@ty";
import { useUser } from "@utils/actions/useUser";
import slugify from "slugify";

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    maxWidth: 512,
    "& .MuiTextField-root": {
      margin: theme.spacing(1)
    }
  },
  img: {
    maxWidth: 512,
    margin: theme.spacing(1)
  },
  helperText: {
    textAlign: "right"
  }
}));

export default function CustomTextField(props) {
  const classes = useStyles();
  const { user } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const maxLength = 400;
  const saveStory = async () => {
    setIsSaving(true);
    const slug = slugify(title);
    const db = firebase.firestore();
    await db
      .collection("stories")
      .doc(slug)
      .set({
        title: title,
        slug,
        imgSrc: image,
        parts: [{ text: message, userId: user.uid }],
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      } as Story);
    Router.push("/browse-stories");
  };
  return (
    <div className={classes.root}>
      <img className={classes.img} src={image || "/placeholder.jpg"} />
      <ImageSelector keyword={title} onChange={setImage} />
      <TextField
        fullWidth
        variant="outlined"
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextField
        {...props}
        label="The story must go on"
        fullWidth
        value={message}
        onChange={e => setMessage(e.target.value)}
        multiline
        inputProps={{ maxLength }}
        FormHelperTextProps={{ className: classes.helperText }}
        helperText={`${message.length}/${maxLength}`}
        variant="outlined"
        rows={7}
      />
      <Button variant="outlined" onClick={saveStory} disabled={isSaving}>
        Start your story
      </Button>
    </div>
  );
}
