import React, { useState } from "react";
import { useMantineTheme } from "@mantine/core";
import { DatePicker, Calendar, Month } from "@mantine/dates";

import useStyles from "../Home.styles";
import { getToday } from "../../../utils/dateTools";

function MantineCalendar(props) {
  const { pickedDate, setPickedDate, userSessions } = props;
  const theme = useMantineTheme();

  const sessions = Object.keys(userSessions);

  return (
    <Calendar
      value={pickedDate}
      onChange={setPickedDate}
      dayStyle={(date) =>
        // checks if each date on calendar matches sessions array
        sessions.some((day) => day === date.toDateString())
          ? { backgroundColor: theme.colors.red[6], color: theme.white }
          : null
      }
    />
  );
}

export default MantineCalendar;
