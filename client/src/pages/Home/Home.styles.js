import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  home: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  welcome: {
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
    h2: {
      margin: "20px 0 10px 0",
    },
  },
  containerRowCol: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  buttons: {
    width: "50%",
    height: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px",
  },
  button: {
    width: "fit-content",
    margin: "10px auto",
  },
  calendarContainer: {
    width: "30%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    margin: "0 auto",
  },
  calendar: {
    width: "fit-content",
  },
  logWrapper: {
    display: "flex",
    margin: "0 auto",
    width: "70%",
    flexDirection: "column",
    h2: {
      borderBottom: `1px ${theme.colors.gray[5]} solid`
    }
  },
}));

export default useStyles;
