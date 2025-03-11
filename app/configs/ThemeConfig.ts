type themeType = {
  backgroundColor: string;
  mainText: string;
  secondaryText: string;
  primary: string;
  secondary: string;
};

export const ThemeConfig: Record<string, themeType> = {
  light: {
    backgroundColor: "#FEFAE0",
    mainText: "#D4A373",
    secondaryText: "#FAEDCD",
    primary: "#CCD5AE",
    secondary: "#E9EDC9",
  },
};
