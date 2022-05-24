import React, { useState } from "react";

import useStyles from "./Home.styles";
import { Button } from "@mantine/core";

import SessionCalendar from "./subcomponents/SessionCalendar";
import UserLog from "./subcomponents/UserLog";
import { getToday, getMonthFromString } from "../../utils/dateTools";

function Home() {
  const { classes } = useStyles();

  // pickedDate for calendar component (set to today by default)
  const [pickedDate, setPickedDate] = useState(new Date(getToday()));

  // grab sessions from localStorage
  const [userSessions, setUserSessions] = useState(
    JSON.parse(localStorage.getItem("mySessions"))
  );

  console.log("userSessions: ", userSessions);

  return (
    <div className={classes.home}>
      {" "}
      <div className={classes.welcome}>
        <h2>Welcome to FlexLog!</h2>
        <p>Sign up or Log in to sync your workouts and activities!</p>
      </div>
      <div className={classes.containerRowCol}>
        <div className={classes.buttons}>
          <a href="/create" className={classes.button}>
            <Button color="green" radius="lg" size="lg">
              Create a Workout
            </Button>
          </a>
          <a href="/workouts" className={classes.button}>
            <Button color="cyan" radius="lg" size="lg">
              My Workouts
            </Button>
          </a>
        </div>
        <div className={classes.calendarContainer}>
          <h3>Your Activity: </h3>
          <SessionCalendar
            userSessions={userSessions}
            className={classes.calendar}
            pickedDate={pickedDate}
            setPickedDate={setPickedDate}
          />
        </div>
      </div>
      <UserLog pickedDate={pickedDate} userSessions={userSessions} />
    </div>
  );
}

export default Home;
