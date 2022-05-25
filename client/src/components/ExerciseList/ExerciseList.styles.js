import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  listContainer: {
    padding: "0 10px 10px 10px",
    border: `1px ${theme.colors.gray[5]} solid`,
    borderRadius: 8,
    marginTop: "20px",
    backgroundColor: theme.colors.gray[0],
  },
  exerciseContainer: {
    padding: "10px",
    borderTop: `1px ${theme.colors.gray[3]} solid`,
    borderBottom: `1px ${theme.colors.gray[3]} solid`,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
  },
  input: {
    width: "50%",
    [`@media(max-width: 680px)`]: {
      width: "100%",
    },
  },
  select: {
    height: "20px",
  },
  settings: {
    display: "flex",
    maxWidth: "480px",
    margin: "0 auto",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: "20px",

    div: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      flexDirection: "row",
      [`@media(max-width: 550px)`]: {
        flexDirection: "column",
      },
    },
  },
  removeButton: {
    width: "100%",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
}));

export default useStyles;
