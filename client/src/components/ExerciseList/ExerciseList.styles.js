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
  },
  select: {
    height: "20px",
  },
  settings: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: '20px'
  },
  removeButton: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  }
}));

export default useStyles;
