export function getToday() {
  const date = new Date();

  return date.toDateString();
}

export function getFormattedTime() {
  const date = new Date();

  // 09:48:25 GMT-0500 (Central Daylight Time)
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let ampm;

  // gets formatted time
  if (hours < 12) {
    // 9:00am
    if (hours !== 0) {
      ampm = "am";
      // 12:00am
    } else {
      ampm = "am";
      hours += 12;
    }
  } else {
    // 2:00pm
    if (hours !== 12) {
      ampm = "pm";
      hours -= 12;
      // 12:00pm
    } else {
      ampm = "pm";
    }
  }

  //   12:5 => 12:05
  if (minutes < 10) {
    minutes = "0" + minutes.toString();
  }

  // end return: 9:05am
  return `${hours}:${minutes} ${ampm}`;
}
