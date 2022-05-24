import React, { useState } from "react";
import { getToday } from "../../../utils/dateTools";

import useStyles from "../Home.styles";

// import Calendar from "./subcomponents/Calendar";

const today = getToday();

function UserLog(props) {
  const { classes } = useStyles();

  const { pickedDate, userSessions } = props;

  const mostRecent =
    Object.keys(userSessions)[Object.keys(userSessions).length - 1];

  console.log(pickedDate.toString());

  // map today's sessions, otherwise most recent (mySessions[mySessions.length - 1])

  return (
    <div className={classes.logWrapper}>
      <h2>Activity Log</h2>
      {/* check for user sessions */}
      {userSessions ? (
        userSessions[today] ? (
          Object.keys(userSessions[today]).map((day, i) => {
            const session = userSessions[today][day];
            return (
              <div>
                <h3>Activity for {pickedDate.toDateString()}</h3>
                <p>
                  {session.title} - {session.time}
                  {/* TODO: map exercises and whatnot */}
                </p>
              </div>
            );
          })
        ) : (
          // gets most recent
          Object.keys(userSessions[mostRecent]).map((day, i) => {
            const session = userSessions[mostRecent][day];
            return (
              <div>
                <h3>Most recent activity: </h3>
                <p>
                  {session.title} - {session.time}
                  {/* TODO: map exercises and whatnot */}
                </p>
              </div>
            );
          })
        )
      ) : (
        // error message on no sessions
        <p>You don't have any workout sessions saved!</p>
      )}
    </div>
  );
}

export default UserLog;
