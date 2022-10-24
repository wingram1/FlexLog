import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.red[6],
    color: theme.colors.gray[2],
    textShadow: `2px 2px ${theme.colors.red[9]}`,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "left", // change back to space-evenly when login/signup is re-added
    alignItems: "center",
    padding: "0 15px 0 15px",
  },
  title: {
    padding: "0 200px",
    [`@media(max-width: 980px)`]: { padding: 0, margin: "0 auto" },
  },
  links: {
    textDecoration: "inherit",
  },
  spacer: {
    // TODO: add MQ to make invisible when <~960px
  },
}));

export default useStyles;
