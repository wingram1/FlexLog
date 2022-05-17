import React from "react";

function ExerciseOptions(props) {
  // import id for datalist
  const datalistId = `list-${props.exList}`;

  return (
    <datalist id={datalistId}>
      <option value="">Choose one</option>
      <option value="Bench Press">Bench Press</option>
      <option value="Biking">Biking</option>
      <option value="Crossfit">Crossfit</option>
      <option value="Deadlift">Deadlift</option>
      <option value="Dumbbell Bench Press">Dumbbell Bench Press</option>
      <option value="Dumbbell Curl">Dumbbell Curl</option>
      <option value="Dumbbell Row">Dumbbell Row</option>
      <option value="Exercise Bike">Exercise Bike</option>
      <option value="Hiking">Hiking</option>
      <option value="Jump Rope">Jump Rope</option>
      <option value="Pullup">Pullup</option>
      <option value="Plank">Plank</option>
      <option value="Pushup">Pushup</option>
      <option value="Rowing">Rowing</option>
      <option value="Running">Running</option>
      <option value="Situp">Situp</option>
      <option value="Stair Climb">Stair Climb</option>
      <option value="Squats">Squats</option>
      <option value="Walking">Walking</option>
    </datalist>
  );
}

export default ExerciseOptions;
