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
    h3: {
      width: 'fit-content'
    }
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
      margin: '20px 0 10px 0',
      borderBottom: `1px ${theme.colors.gray[5]} solid`,
    },
  },
  dateContainer: {
    padding: '0 20px 0 20px',
    h3: {
      margin: "0",
    },
  },
}));

export default useStyles;
