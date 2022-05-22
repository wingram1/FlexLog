import React from "react";
import useStyles from "./Header.styles";

function Header() {
  const { classes } = useStyles();

  return (
    <header className={classes.header}>
      <a href="/">
        <h1>FlexLog</h1>
      </a>
      <a href="/login" className={classes.links}>
        <p>Log In/Sign Up</p>
      </a>
    </header>
  );
}

export default Header;