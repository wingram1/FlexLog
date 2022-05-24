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

  const pickedDateString = pickedDate.toDateString();

  // map today's sessions, otherwise most recent (mySessions[mySessions.length - 1])

  return (
    <div className={classes.logWrapper}>
      <h2>Activity Log</h2>
      {/* check for user sessions */}
      {userSessions ? (
        userSessions[pickedDateString] ? (
          <div className={classes.dateContainer}>
            {userSessions[pickedDateString] === userSessions[today] ? (
              <h3>Today's Activity ({pickedDateString}): </h3>
            ) : (
              <h3>Activity for {pickedDate.toDateString()}</h3>
            )}
            {Object.keys(userSessions[pickedDateString]).map((day, i) => {
              const session = userSessions[pickedDateString][day];
              return (
                <div>
                  <h3>
                    {session.title} - {session.time}
                  </h3>
                  <ul>
                    {/* map exercises */}
                    {session.exercises.map((exercise, i) => {
                      return (
                        <li>
                          {exercise.name} :
                          {exercise.setData.map((set, i) => {
                            // map setData & conditionally return values
                            return (
                              <div>
                                <h4>Set {set.setNum}:</h4>
                                <ul>
                                  {set.reps ? <li>Reps: {set.reps}</li> : <></>}
                                  {set.weight ? (
                                    <li>Weight: {set.weight}</li>
                                  ) : (
                                    <></>
                                  )}
                                  {set.distance ? (
                                    <li>Distance: {set.distance}</li>
                                  ) : (
                                    <></>
                                  )}
                                  {set.time ? <li>Time: {set.time}</li> : <></>}
                                </ul>
                              </div>
                            );
                          })}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          // Error message if no sessions on selected date
          <div className={classes.dateContainer}>
            <h3>{pickedDateString}</h3>
            <h4>No sessions found for this date!</h4>
          </div>
          // })
        )
      ) : (
        // error message on no sessions
        <h4>You don't have any workout sessions saved!</h4>
      )}
    </div>
  );
}

export default UserLog;
