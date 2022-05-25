import React, { useState } from "react";
import { getToday } from "../../../utils/dateTools";

import useStyles from "../Home.styles";

// import Calendar from "./subcomponents/Calendar";

const today = getToday();

function UserLog(props) {
  const { classes } = useStyles();

  const { pickedDate, userSessions } = props;

  // const mostRecent =
  //   Object.keys(userSessions)[Object.keys(userSessions).length - 1];

  const pickedDateString = pickedDate.toDateString();

  // map today's sessions, otherwise most recent (mySessions[mySessions.length - 1])

  return (
    <div className={classes.logWrapper}>
      <h2>Activity Log</h2>
      {/* check for user sessions */}
      {userSessions ? (
        userSessions[pickedDateString] ? (
          <div className={classes.dateContainer}>
            <div className={classes.dateHeader}>
              {userSessions[pickedDateString] === userSessions[today] ? (
                <h3>Today's Activity ({pickedDateString}): </h3>
              ) : (
                <h3>Activity for {pickedDate.toDateString()}</h3>
              )}
            </div>
            {Object.keys(userSessions[pickedDateString]).map((day, i) => {
              const session = userSessions[pickedDateString][day];
              return (
                <div className={classes.sessionsContainer}>
                  <div className={classes.logHeader}>
                    <h3>{session.title}</h3>
                    <h3>{session.time}</h3>
                  </div>
                  <ul>
                    {/* map exercises */}
                    {session.exercises.map((exercise, i) => {
                      return (
                        <li>
                          <h4>{exercise.name}:</h4>
                          {exercise.setData.map((set, i) => {
                            // map setData & conditionally return values
                            return (
                              <div>
                                <h4>Set {set.setNum}:</h4>
                                <ul>
                                  {set.reps ? <li>Reps: {set.reps}</li> : <></>}
                                  {set.weight ? (
                                    <li>Weight: {set.weight} lbs</li>
                                  ) : (
                                    <></>
                                  )}
                                  {set.distance ? (
                                    <li>Distance: {set.distance} mi</li>
                                  ) : (
                                    <></>
                                  )}
                                  {set.time ? (
                                    <li>
                                      Time:{"  "}
                                      <span>
                                        {" "}
                                        {/* hours */}
                                        {(
                                          "0" +
                                          Math.floor((set.time / 3600) % 60)
                                        ).slice(-2)}{" "}
                                        :
                                      </span>
                                      <span>
                                        {" "}
                                        {/* minutes */}
                                        {(
                                          "0" + Math.floor((set.time / 60) % 60)
                                        ).slice(-2)}{" "}
                                        :
                                      </span>{" "}
                                      {/* seconds */}
                                      <span>{`0${set.time}`.slice(-2)}</span>
                                    </li>
                                  ) : (
                                    <></>
                                  )}
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
