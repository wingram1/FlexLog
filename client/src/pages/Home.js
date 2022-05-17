import React from "react";

function Home() {
  return (
    <div>
      <p>Hello from Homepage</p>
      <a href="/create">
        <button>Create a workout</button>
      </a>
      <a href="/workout">
        <button>Go to workouts page</button>
      </a>
      <div>Log component (calendar, etc.) here</div>
    </div>
  );
}

export default Home;
