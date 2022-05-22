import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  home: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  buttons: {
    width: "100%",
    height: "20%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "10px",
  },
  button: {
    // margin: "40px 40px 40px",
  },
}));

export default useStyles;
