import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LightSwitch from "@components/LightSwitch";

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
    height: 100,
    borderTop: "1px solid #eaeaea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  twitter: {
    textDecoration: "none",
    color: "inherit"
  },
  switch: {
    position: "absolute",
    right: 0
  }
});

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      Proudly presented by&nbsp;
      <a
        className={classes.twitter}
        href="https://twitter.com/sakulstra"
        target="_blank"
        rel="noopener noreferrer"
      >
        @sakulstra
      </a>
      <div className={classes.switch}>
        <LightSwitch />
      </div>
    </footer>
  );
}
