export type themeType = {
  backgroundColor: string;
  mainText: string;
  secondaryText: string;
  primary: string;
  secondary: string;
};

export const ThemeConfig: Record<string, themeType> = {
  light: {
    backgroundColor: "#DEDBD2",
    mainText: "#4A5759",
    secondaryText: "#B0C4B1",
    primary: "#6b9080",
    secondary: "#F7E1D7",
  },
};
