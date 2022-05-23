import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    // subscribe to color scheme changes right in your styles
    // backgroundColor: theme.colors.gray[4],
    // color: theme.colors.dark[6],
    // maxWidth: 400,
    width: "100%",
    height: "100%",
    // minHeight: "100",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: theme.radius.sm,
    flexDirection: "column",
  },
  content: {
    width: "100%",
    minHeight: "84vh",
  },
}));

export default useStyles;
