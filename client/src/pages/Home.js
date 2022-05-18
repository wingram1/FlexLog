import React from "react";

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
      <div>Log component (calendar, etc.) here</div>
    </div>
  );
}

export default Home;
