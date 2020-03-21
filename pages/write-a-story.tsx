import React from "react";
import Grid from "@material-ui/core/Grid";
import LoginUi from "@components/LoginUi";
import TextField from "@components/TextField";

export default function WriteAStory() {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <TextField />
      </Grid>
      <LoginUi />
    </Grid>
  );
}
