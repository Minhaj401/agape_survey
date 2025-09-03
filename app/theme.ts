import { createTheme } from '@mui/material/styles';

const vibrantPalette = {
  primary: {
    main: '#3D5AFE', // Indigo A200
    light: '#7A7CFF',
    dark: '#2C3CCB',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FF4081', // Pink A200
    light: '#FF79A8',
    dark: '#C60055',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#00C853', // Green A700
  },
  warning: {
    main: '#FFAB00', // Amber A700
  },
  error: {
    main: '#FF1744', // Red A400
  },
  info: {
    main: '#00B8D4', // Cyan A700
  },
  background: {
    default: '#FAFAFF',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#4B5563',
  },
  // Additional vibrant colors for background elements
  extraColors: {
    pinkLight: '#FFCDD2',
    blueLight: '#BBDEFB',
    yellowLight: '#FFF9C4',
    greenLight: '#C8E6C9',
    purpleLight: '#E1BEE7',
  },
};

declare module '@mui/material/styles' {
  interface Palette {
    extraColors: {
      pinkLight: string;
      blueLight: string;
      yellowLight: string;
      greenLight: string;
      purpleLight: string;
    };
  }
  interface PaletteOptions {
    extraColors?: {
      pinkLight?: string;
      blueLight?: string;
      yellowLight?: string;
      greenLight?: string;
      purpleLight?: string;
    };
  }
}

const theme = createTheme({
  palette: vibrantPalette,
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'Fredoka, Poppins, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    h1: {
      fontSize: '2.6rem',
      fontWeight: 800,
      letterSpacing: 0.2,
      color: vibrantPalette.primary.dark,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: vibrantPalette.primary.main,
    },
    h3: {
      fontSize: '1.6rem',
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          paddingInline: '18px',
          paddingBlock: '10px',
          boxShadow: '0 6px 16px rgba(61, 90, 254, 0.25)',
        },
        containedSecondary: {
          boxShadow: '0 6px 16px rgba(255, 64, 129, 0.25)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 10,
          borderRadius: 999,
          backgroundColor: '#E8EAF6',
        },
        bar: {
          borderRadius: 999,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

export default theme;
