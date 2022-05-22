import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.red[6],
    color: theme.colors.gray[2],
    textShadow: `2px 2px ${theme.colors.red[9]}`,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 15px 0 15px",
  },
  title: {

  },
  links: {
      textDecoration: 'inherit'
  }
}));

export default useStyles;
