import React, { useState } from "react";

import UserLog from "../components/userlog2";

function Home() {
  return (
    <div>
      <p>Hello from Homepage</p>
      <a href="/create">
        <button>Create a Workout</button>
      </a>
      <a href="/workouts">
        <button>My Workouts</button>
      </a>
      <UserLog />
    </div>
  );
}

export default Home;
