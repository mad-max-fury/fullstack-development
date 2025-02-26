export const theme = {
  colors: {
    beige: {
      500: '#98908B',
      100: '#F8F4F0',
    },
    slate: {
      600: '#666CA3',
    },
    grey: {
      900: '#201F24',
      500: '#696868',
      300: '#B3B3B3',
      100: '#F2F2F2',
    },
    secondary: {
      green: '#277C78',
      yellow: '#F2CDAC',
      cyan: '#82C9D7',
      navy: '#626070',
      red: '#C94736',
      purple: '#826CB0',
    },
    other: {
      purple: '#AF81BA',
      turquoise: '#597C7C',
      brown: '#93674F',
      magenta: '#934F6F',
      blue: '#3F82B2',
      navyGrey: '#97A0AC',
      armyGreen: '#7F9161',
      gold: '#CAB361',
      orange: '#BE6C49',
      bg: 'F2F3F7',
    },
    white: '#FFFFFF',
  },

  typography: {
    fontFamily: {
      primary: `"Public Sans", sans-serif`,
    },

    presets: {
      h1: {
        fontFamily: `"Public Sans", sans-serif`,
        fontWeight: 700,
        fontSize: 'clamp(24px, 5vw, 32px)',
        lineHeight: 'clamp(28.8px, 5.5vw, 38.4px)',
        letterSpacing: '0px',
      },
      h2: {
        fontFamily: `"Public Sans", sans-serif`,
        fontWeight: 700,
        fontSize: 'clamp(16px, 3vw, 20px)',
        lineHeight: 'clamp(19.2px, 3.5vw, 24px)',
        letterSpacing: '0px',
      },
      h3: {
        fontFamily: `"Public Sans", sans-serif`,
        fontWeight: 700,
        fontSize: 'clamp(14px, 2.5vw, 16px)',
        lineHeight: 'clamp(21px, 3.75vw, 24px)',
        letterSpacing: '0px',
      },
      body1: {
        fontFamily: `"Public Sans", sans-serif`,
        fontWeight: 400,
        fontSize: 'clamp(14px, 2.5vw, 16px)',
        lineHeight: 'clamp(21px, 3.75vw, 24px)',
        letterSpacing: '0px',
      },
      body1Bold: {
        fontFamily: `"Public Sans", sans-serif`,
        fontWeight: 700,
        fontSize: 'clamp(14px, 2.5vw, 16px)',
        lineHeight: 'clamp(21px, 3.75vw, 24px)',
        letterSpacing: '0px',
      },
      body2: {
        fontFamily: `"Public Sans", sans-serif`,
        fontWeight: 400,
        fontSize: 'clamp(12px, 2vw, 14px)',
        lineHeight: 'clamp(18px, 3vw, 21px)',
        letterSpacing: '0px',
      },
      body2Bold: {
        fontFamily: `"Public Sans", sans-serif`,
        fontWeight: 700,
        fontSize: 'clamp(12px, 2vw, 14px)',
        lineHeight: 'clamp(18px, 3vw, 21px)',
        letterSpacing: '0px',
      },
    },
  },

  spacing: {
    500: '40px',
    400: '32px',
    300: '24px',
    250: '20px',
    200: '16px',
    150: '12px',
    100: '8px',
    50: '4px',
  },
  container: {
    maxWidth: '1440px',
    maxWidthInner: '1060px',
  },
};

export type ITheme = typeof theme;
