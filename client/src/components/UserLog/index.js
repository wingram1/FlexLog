import React, { useState } from "react";
import { getToday } from "../../utils/dateTools";

// import Calendar from "./subcomponents/Calendar";

const today = getToday();

function UserLog() {
  // grab sessions from localStorage
  const [userSessions, setUserSessions] = useState(
    JSON.parse(localStorage.getItem("mySessions"))
  );

  const mostRecent =
    Object.keys(userSessions)[Object.keys(userSessions).length - 1];

  console.log(mostRecent);

  // map today's sessions, otherwise most recent (mySessions[mySessions.length - 1])

  return (
    <div>
      <h2>Activity Log</h2>
      {/* check for user sessions */}
      {userSessions ? (
        userSessions[today] ? (
          Object.keys(userSessions[today]).map((day, i) => {
            const session = userSessions[today][day];
            return (
              <div>
                <h3>Today's Activity:</h3>
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
                <h3>Today's Activity:</h3>
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
