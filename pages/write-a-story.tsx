import React from "react";
import Grid from "@material-ui/core/Grid";
import StoryForm from "@components/StoryForm";
import ImageSelector from "@components/ImageSelector";

export default function WriteAStory() {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <ImageSelector keyword="just great" />
      </Grid>
      <Grid item xs={12}>
        <StoryForm />
      </Grid>
    </Grid>
  );
}
