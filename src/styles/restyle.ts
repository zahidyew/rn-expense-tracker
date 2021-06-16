import { createTheme } from '@shopify/restyle';

const palette = {
  white: '#ffffff',
  offWhite: '#f2f2f2',
  lightSkyBlue: '#f1f8ff',
  darkNavy: '#21262d',
  green: '#2ea043',
  lightBlue: '#58a6ff',
  lightRed: '#f9826c',
  gray: '#c9d1d9',
  red: '#ff2f2f',
  yellow: '#ffcc11',

  black: '#000000',
  darkGray: '#0d1117',
  //darkGray: '#30363d',

  lightGray: '#c9d1d9',
};

const theme = createTheme({
  colors: {
    background: palette.offWhite,
    foreground: palette.white,
    text: palette.black,
    subtext: palette.darkNavy,
    success: palette.green,
    primary: palette.lightBlue,
    error: palette.red,
    warning: palette.yellow,
    highlight: palette.lightRed,
    border: palette.gray,
    buttonText: palette.white,
  },
  spacing: {
    xs: 4,
    s: 8,
    ms: 12,
    m: 16,
    ml: 20,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    body: {
      fontSize: 14,
      color: 'text',
    },
    centeredText: {
      color: 'text',
      textAlign: 'center',
    },
    buttonText: {
      color: 'buttonText',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 12,
      color: 'text',
      opacity: 0.5,
    },
    selectedText: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'success',
    },
  },
  cardVariants: {
    expensesCard: {
      height: 70,
      backgroundColor: 'foreground',
      justifyContent: 'center',
      shadowOpacity: 0.15,
      shadowOffset: { width: 1, height: 2 },
      elevation: 2,
    },
    modal: {
      width: '100%',
      margin: 'm',
      paddingHorizontal: 'xl',
      paddingBottom: 'ml',
      paddingTop: 'ms',
      borderRadius: 20,
      alignItems: 'center',
      backgroundColor: 'foreground',
      borderWidth: 1,
      borderColor: 'border',
      shadowColor: 'text',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
      shadowOffset: {
        width: 2,
        height: 3,
      },
    },
  },
  buttonVariants: {
    button: {
      marginTop: 's',
      paddingVertical: 's',
      paddingHorizontal: 'ms',
      borderRadius: 10,
      elevation: 2,
    },
  },
});

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    foreground: palette.darkGray,
    subtext: palette.gray,
    text: palette.white,
    border: palette.darkNavy,
  },
};

export type Theme = typeof theme;
export { theme, darkTheme };
