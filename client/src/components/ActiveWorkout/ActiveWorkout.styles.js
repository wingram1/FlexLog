import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "100%",
    maxWidth: "900px",
    height: "100%",
    margin: "0 auto",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    h1: {
      textAlign: "center",
    },
  },
  setContainer: {
    width: "60%",
    minHeight: '500px',
    margin: "0 auto",
    display: "flex",
    alignItems: 'stretch',
    flexDirection: "column",
    input: {
      width: "30%",
      minWidth: "150px",
    },
    [`@media(max-width: 550px)`]: {
      width: '90%',
    },
    
  },
  setHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    h3: {
      fontSize: 30,
    },
  },
  setNav: {
    marginTop: "20px",
    margin: '0 auto',
    width: "60%",
    display: "flex",
    flexDirection: "row",
  },
  back: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
  },
  fwd: {
    width: "50%",
    display: "flex",
    flexDirection: "row-reverse",
  },

  //   Timer subcomponent classes
  timerForm: {
    display: "flex",
    justifyContent: "center",
  },
  timerContainer: {
    width: "230px",
    margin: '0 auto',
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  timerWrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  timerInternal: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    h4: {
      textAlign: "center",
    },
  },
  time: {
    fontSize: "40px",
    textAlign: "center",
  },
  timerButtons: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
    button: {
        margin: '0 5px'
    }
  },
  //   Stopwatch subcomponent classes
  stopwatch: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    textAlign: "center",
    height: "230px",
    width: "230px",
    margin: "10px auto",
    padding: "10px",
    border: `12px ${theme.colors.blue[8]} solid`,
    borderRadius: 230,
  },

  
}));

export default useStyles;
