import React, { useState } from "react";

import useStyles from "./Home.styles";
import { Center, Button } from "@mantine/core";

import UserLog from "../../components/UserLog";

function Home() {
  const { classes } = useStyles();

  return (
    <div className={classes.home}>
      <div className={classes.buttons}>
        <a href="/create" className={classes.button}>
          <Button color="green" radius="lg" size="lg">
            Create a Workout
          </Button>
        </a>
        <a href="/workouts">
          <Button color="cyan" radius="lg" size="lg">
            My Workouts
          </Button>
        </a>
      </div>
      <UserLog />
    </div>
  );
}

export default Home;
