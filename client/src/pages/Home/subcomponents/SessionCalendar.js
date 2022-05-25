import React from "react";
import { useMantineTheme } from "@mantine/core";
import { Calendar } from "@mantine/dates";

function MantineCalendar(props) {
  const { pickedDate, setPickedDate, userSessions } = props;
  const theme = useMantineTheme();

  const sessions = Object.keys(userSessions);

  return (
    <Calendar
      value={pickedDate}
      onChange={setPickedDate}
      firstDayOfWeek="sunday"
      dayStyle={(date) =>
        // checks if each date on calendar matches sessions array, highlights if it does
        sessions.some((day) => day === date.toDateString())
          ? { backgroundColor: theme.colors.red[6], color: theme.white }
          : null
      }
    />
  );
}

export default MantineCalendar;
