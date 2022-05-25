import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  editFormContainer: {
    width: "100%",
    maxWidth: "900px",
    height: "fit-content",
    backgroundColor: theme.colors.gray[0],
    border: `1px ${theme.colors.gray[5]} solid`,
    borderRadius: 8,
    margin: "10px 0 10px 0",
    padding: "5px 20px 10px 20px",
  },
  title: {
    width: "75%",
  },
  categories: {
    width: "75%",
  },
  description: {},
  submit: {
    display: "flex",
    flexDirection: "row-reverse",
    paddingTop: "20px",
  },
}));

export default useStyles;
