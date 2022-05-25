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
    margin: "0 10px",
    h2: {
      margin: "20px 0 10px 0",
    },
  },
  containerRowCol: {
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    [`@media(max-width: 980px)`]: { flexDirection: "column" },
  },
  buttons: {
    width: "100%",
    height: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px",
    margin: "0 auto",
  },
  button: {
    width: "fit-content",
    margin: "10px auto",
  },
  calendarContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    margin: "0 auto",
    h3: {
      width: "fit-content",
      margin: "0 auto",
    },
  },
  calendarComponent: {
    width: "fit-content",
    margin: "0 auto",
  },
  logWrapper: {
    display: "flex",
    margin: "30px auto 0 auto",
    width: "70%",
    flexDirection: "column",
    h2: {
      backgroundColor: theme.colors.red[6],
      color: theme.colors.gray[0],
      padding: "20px 30px 10px 30px",
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      margin: "0 0 20px 0",
      borderBottom: `1px ${theme.colors.gray[5]} solid`,
    },
    backgroundColor: theme.colors.gray[0],
    border: `1px ${theme.colors.gray[5]} solid`,
    borderRadius: 8,
  },
  dateContainer: {
    width: "100%",
    justifyContent: "center",
    padding: "0 20px 0 20px",
    h3: {
      width: "fit-content",
      margin: 0,
    },
  },
  dateHeader: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  logHeader: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  sessionsContainer: {
    backgroundColor: theme.colors.gray[0],
    border: `1px ${theme.colors.gray[5]} solid`,
    borderRadius: 8,
    margin: "10px 20px 10px 20px",
    padding: "5px 20px 10px 20px",
  },
}));

export default useStyles;
