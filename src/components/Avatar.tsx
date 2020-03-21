import React from "react";
import Avatar, { AvatarProps } from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    right: 5
  }
});

export default function CustomAvatar(props: AvatarProps) {
  const classes = useStyles();
  return (
    <Avatar
      {...props}
      className={classes.root}
      variant="rounded"
      src="https://www.thispersondoesnotexist.com/image"
    />
  );
}
