import { createTheme, alpha } from '@mui/material/styles';
import { filledInputClasses, inputLabelClasses, outlinedInputClasses, paperClasses } from '@mui/material';
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
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '4px',
        textTransform: 'none',
      },
      sizeSmall: {
        padding: '6px 16px',
      },
      sizeMedium: {
        padding: '8px 20px',
      },
      sizeLarge: {
        padding: '11px 24px',
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
  MuiInputBase: {
    styleOverrides: {
      input: ({ theme }) => ({
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px transparent inset',
          WebkitTextFillColor: theme.palette.text.primary,
          caretColor: theme.palette.text.primary,
          transition: 'background-color 9999s ease-out 0s',
        },
        '&::placeholder': {
          opacity: 1,
          color: basePalette.neutral[600],
        },
      }),
      root: {
        margin: '5px 0',
      },
    },
  },
  MuiInput: {
    styleOverrides: {
      input: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '24px',
        '&::placeholder': {
          color: basePalette.text.secondary,
        },
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        backgroundColor: 'transparent',
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        overflow: 'hidden',
        borderColor: basePalette.primary.main,
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
          borderColor: basePalette.primary.main,
          boxShadow: `${basePalette.primary.main} 0 0 0 1px`,
        },
        [`&.${filledInputClasses.error}`]: {
          borderColor: basePalette.error.main,
          boxShadow: `${basePalette.error.main} 0 0 0 1px`,
        },
      },
      input: ({ theme }) => ({
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '24px',
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px transparent inset',
          WebkitTextFillColor: theme.palette.text.primary,
          caretColor: theme.palette.text.primary,
          transition: 'background-color 9999s ease-out 0s',
        },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '&:hover': {
          // backgroundColor: basePalette.action.hover,
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: basePalette.neutral[200],
          },
        },
        [`&.${outlinedInputClasses.focused}`]: {
          backgroundColor: 'transparent',
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: basePalette.primary.main,
            boxShadow: `${basePalette.primary.main} 0 0 0 2px`,
          },
        },
        [`&.${filledInputClasses.error}`]: {
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: basePalette.error.main,
            boxShadow: `${basePalette.error.main} 0 0 0 2px`,
          },
        },
      },
      input: ({ theme }) => ({
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '24px',
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px transparent inset',
          WebkitTextFillColor: theme.palette.text.primary,
          caretColor: theme.palette.text.primary,
          transition: 'background-color 9999s ease-out 0s',
        },
      }),
      notchedOutline: {
        borderColor: basePalette.neutral[200],
        transition: muiTheme.transitions.create(['border-color', 'box-shadow']),
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontSize: 14,
        fontWeight: 500,
        [`&.${inputLabelClasses.filled}`]: {
          transform: 'translate(12px, 18px) scale(1)',
        },
        [`&.${inputLabelClasses.shrink}`]: {
          [`&.${inputLabelClasses.standard}`]: {
            transform: 'translate(0, -1.5px) scale(0.85)',
          },
          [`&.${inputLabelClasses.filled}`]: {
            transform: 'translate(12px, 6px) scale(0.85)',
          },
          [`&.${inputLabelClasses.outlined}`]: {
            transform: 'translate(14px, -9px) scale(0.85)',
          },
        },
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
