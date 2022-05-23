import React from "react";
import useStyles from "./Footer.styles";

function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.slogan}>
      <p>Flexing Our Logs Since 2022™</p>
    </div>
  );
}

export default Footer;
