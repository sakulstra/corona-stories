import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Avatar from "@components/UserAvatar";
import Link from "@components/Link";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: 60,
    padding: "5px 0px",
    alignItems: "center"
  },
  grow: {
    flexGrow: 1
  }
});

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link href="/">Coronastories</Link>
      <div className={classes.grow}></div>
      <Avatar />
    </div>
  );
}
