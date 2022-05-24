import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  workoutsWrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  workoutsContainer: {
    width: "100%",
    maxWidth: "900px",
    height: "fit-content",
    // backgroundColor: theme.colors.gray[0],
    // border: `1px ${theme.colors.gray[5]} solid`,
    borderRadius: 8,
    margin: "0 auto",
    padding: "5px 20px 10px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  workoutsHeader: {
    height: "50px",
    width: "80%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workoutCard: {
    backgroundColor: theme.colors.gray[0],
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "10px auto 20px auto",
    border: `1px ${theme.colors.gray[5]} solid`,
    borderRadius: 8,
    "&:first-of-type": {
      backgroundColor: theme.colors.red[9],
    },
  },
  cardTitle: {
    width: "100%",
    color: theme.colors.gray[2],
    textShadow: "2px",
    borderRadius: 8,
    backgroundColor: theme.colors.red[6],
    h3: {
      width: "100%",
      margin: "5px",
    },
    padding: '2px',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  workoutCardMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  subContainer: {
    width: "45%",
    display: "flex",
    flexDirection: "column",
    margin: "5px auto",
  },
  badge: {
    margin: "5px",
  },
  description: {
    padding: "0 10px 0 10px",
    backgroundColor: theme.colors.gray[2],
    border: `1px ${theme.colors.gray[6]} solid`,
    borderRadius: 8,
    minHeight: "120px",
  },
  workoutOptions: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "10px auto 5px auto",
  },
  workoutStart: {
    display: "flex",
    flexDirection: "row-reverse",
  },
}));

export default useStyles;
