import React from "react";
import useStyles from "./Header.styles";

function Header() {
  const { classes } = useStyles();

  return (
    <header className={classes.header}>
      <a href="/" className={classes.title}>
        <h1>FlexLog</h1>
      </a>
      <div className={classes.spacer}></div>
      {/* <a href="/login" className={classes.links}>
        <p>Log In/Sign Up</p>
        
      </a> */}
    </header>
  );
}

export default Header;
