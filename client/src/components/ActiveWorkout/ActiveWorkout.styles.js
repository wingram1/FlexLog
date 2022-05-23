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
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    input: {
      width: "30%",
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
    width: "100%",
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
}));

export default useStyles;
