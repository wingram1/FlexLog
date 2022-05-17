import React from "react";

function Workout() {
  return (
    <div>
      <a href="/create">
        <button>Create a New Workout</button>
      </a>
      {/* take to explore page; if not logged in, take to login page */}
      <a href="/explore">
        <button>Explore!</button>
      </a>
      <div>
        <h2>My Workouts</h2>
        <p>(Map workouts here; if none, show message)</p>
      </div>
    </div>
  );
}

export default Workout;
