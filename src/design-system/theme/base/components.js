import { createTheme, alpha } from '@mui/material/styles';
import { filledInputClasses, paperClasses } from '@mui/material';
import { basePalette } from '../../tokens/colors';

const muiTheme = createTheme();
export const baseComponents = {
  MuiAvatar: {
    styleOverrides: {
      root: {
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: 0,
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        maxWidth: '1312px',
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        minHeight: 76,
        '@media (min-width: 0px)': { minHeight: 60 },
        '@media (min-width: 768px)': { minHeight: 76 },
      },
    },
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {},
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
      variant: 'contained',
    },
    styleOverrides: {
      root: {
        borderRadius: '12px',
        textTransform: 'none',
        fontSize: 16,
        fontWeight: 400,
      },
      contained: () => ({
        background: 'linear-gradient(90deg, rgba(57,120,255,1), rgba(168,74,255,1))',
        color: 'white',
        boxShadow: '0 6px 8px rgba(67, 99, 255, 0.28)',
        '&:hover': {
          background: 'linear-gradient(90deg, rgba(57,120,255,0.95), rgba(168,74,255,0.95))',
          boxShadow: '0 6px 8px rgba(67, 99, 255, 0.48)',
          filter: 'brightness(1.02)',
        },
        '&:active': {
          transform: 'translateY(1px)',
        },
        '&.Mui-disabled': {
          color: 'rgba(255,255,255,0.75)',
          background:
            'linear-gradient(90deg, rgba(43,106,246,0.45) 0%, rgba(124,44,243,0.45) 70%, rgba(161,42,240,0.45) 100%)',
        },
      }),
      sizeSmall: {
        padding: '6px 16px',
        fontSize: 14,
      },
      sizeMedium: {
        padding: '8px 20px',
      },
      sizeLarge: {
        padding: '12px 24px',
        fontSize: 18,
        borderRadius: '16px',
      },
      textSizeSmall: {
        padding: '7px 12px',
      },
      textSizeMedium: {
        padding: '9px 16px',
      },
      textSizeLarge: {
        padding: '12px 16px',
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }),
      option: ({ theme }) => ({
        color: theme.palette.text.primary,
        '&.Mui-focused': {
          backgroundColor: alpha(theme.palette.primary.main, 0.15),
        },
        '&[aria-selected="true"]': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        },
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }),
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-selected': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
        },
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        },
        '&.Mui-selected.Mui-focusVisible': {
          backgroundColor: theme.palette.primary.main,
        },
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 4,
        [`&.${paperClasses.elevation1}`]: {
          boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
        },
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: '32px 24px',
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      '*': {
        boxSizing: 'border-box',
      },
      html: {
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        width: '100%',
      },
      body: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        minHeight: '100%',
        width: '100%',
      },
      '#__next': {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      },
      '#nprogress': {
        pointerEvents: 'none',
      },
      '#nprogress .bar': {
        backgroundColor: basePalette.primary.main,
        height: 3,
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 2000,
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: {
        height: '100%',
        maxHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        color: '#90A1B9',
        marginTop: '0 !important',
      },
      positionStart: {
        marginRight: 8,
      },
      positionEnd: {
        marginLeft: 8,
        '& .MuiIconButton-root': {
          color: '#90A1B9',

          '&:hover': {
            backgroundColor: 'transparent',
            color: '#2563EB',
          },
        },
      },
    },
  },
  MuiInput: {
    styleOverrides: {
      input: {
        fontSize: 14,
        fontWeight: 500,
        '&::placeholder': {
          color: basePalette.neutral[200],
        },
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#CAD5E2',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        transition: muiTheme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: basePalette.action.hover,
        },
        '&:before': {
          display: 'none',
        },
        '&:after': {
          display: 'none',
        },
        [`&.${filledInputClasses.disabled}`]: {
          backgroundColor: 'transparent',
        },
        [`&.${filledInputClasses.focused}`]: {
          backgroundColor: 'transparent',
          borderColor: basePalette.action.hover,
        },
        [`&.${filledInputClasses.error}`]: {
          borderColor: basePalette.error.main,
        },
      },
      input: ({ theme }) => ({
        // height: 48,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingTop: 14,
        paddingBottom: 14,
        '.MuiInputBase-adornedStart &': {
          paddingLeft: 0,
          paddingRight: 16,
        },
        ':not(.MuiInputBase-adornedStart) &': {
          paddingLeft: 16,
          paddingRight: 16,
        },

        '&::placeholder': {
          color: '#9CA3AF',
          opacity: 1,
        },
        fontSize: 16,
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px transparent inset',
          WebkitTextFillColor: theme.palette.text.primary,
          caretColor: theme.palette.text.primary,
          transition: 'background-color 9999s ease-out 0s',
        },
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontSize: 14,
        color: '#314158',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.71,
        minWidth: 'auto',
        paddingLeft: 0,
        paddingRight: 0,
        textTransform: 'none',
        '& + &': {
          marginLeft: 24,
        },
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'filled',
    },
  },
};
