import React, { useState, useEffect } from "react";

import useStyles from "./Home.styles";
import { Button } from "@mantine/core";

import SessionCalendar from "./subcomponents/SessionCalendar";
import UserLog from "./subcomponents/UserLog";
import { getToday, getMonthFromString } from "../../utils/dateTools";

import localForage from "localforage";

function Home() {
  const { classes } = useStyles();

  // pickedDate for calendar component (set to today by default)
  const [pickedDate, setPickedDate] = useState(new Date(getToday()));

  // set up blank array
  const [userSessions, setUserSessions] = useState({});

  // check localForage for sessions then populate userSessions with those
  useEffect(() => {
    async function getSessions() {
      const value = await localForage.getItem("mySessions").then((data) => {
        return data;
      });
      return JSON.parse(value);
    }

    getSessions()
      .then((value) => {
        setUserSessions(value);
      })
      .catch(console.error);
  }, []);

  return (
    <div className={classes.home}>
      {" "}
      <div className={classes.welcome}>
        <h2>Welcome to FlexLog!</h2>
        <p>
          Sign up or Log in to sync your workouts and activities across devices!
        </p>
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
            size="xl"
            fullWidth
          />
        </div>
      </div>
      <UserLog pickedDate={pickedDate} userSessions={userSessions} />
    </div>
  );
}

export default Home;
