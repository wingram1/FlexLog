import { Global } from "@mantine/core";

export function GlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },

        body: {
          backgroundColor: theme.colors.gray[2],
          color: theme.colors.dark[6],
          minHeight: "100vh",
        },

        a: {
          color: "inherit",
          // textDecoration: 'inherit',
        },
      })}
    />
  );
}

export default GlobalStyles;
