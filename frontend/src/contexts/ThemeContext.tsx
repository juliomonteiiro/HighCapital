import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightPalette, darkPalette, commonPalette } from '../styles/theme';
import { colors } from '../constants/colors';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    themeMode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
        const savedTheme = localStorage.getItem('themeMode');
        return (savedTheme as ThemeMode) || 'light';
    });

    useEffect(() => {
        localStorage.setItem('themeMode', themeMode);
    }, [themeMode]);

    const toggleTheme = () => {
        setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    const palette = themeMode === 'light' ? lightPalette : darkPalette;

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: palette.primary.main,
                light: palette.primary.light,
                dark: palette.primary.dark,
                contrastText: palette.primary.contrastText,
            },
            secondary: {
                main: palette.secondary.main,
                light: palette.secondary.light,
                dark: palette.secondary.dark,
                contrastText: palette.secondary.contrastText,
            },
            background: {
                default: palette.background.default,
                paper: palette.background.paper,
            },
            text: {
                primary: palette.text.primary,
                secondary: palette.text.secondary,
            },
            divider: palette.divider,
            success: palette.success,
            error: palette.error,
            warning: palette.warning,
            info: palette.info,
            action: {
                disabled: palette.text.disabled,
                disabledBackground: themeMode === 'light' ? colors.background.disabled : colors.dark.secondary,
            },
        },
        typography: {
            fontFamily: commonPalette.typography.fontFamily,
            h4: {
                fontWeight: commonPalette.typography.fontWeight.semibold,
                color: palette.text.primary,
            },
            h6: {
                fontWeight: commonPalette.typography.fontWeight.semibold,
                color: palette.text.primary,
            },
        },
        shape: {
            borderRadius: commonPalette.borderRadius.medium,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: commonPalette.typography.fontWeight.semibold,
                        borderRadius: commonPalette.borderRadius.medium,
                        transition: commonPalette.transitions.medium,
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: palette.shadowHover,
                        },
                    },
                    contained: {
                        background: `linear-gradient(135deg, ${palette.primary.main} 0%, ${palette.primary.dark} 100%)`,
                        '&:hover': {
                            background: `linear-gradient(135deg, ${palette.primary.dark} 0%, ${palette.primary.main} 100%)`,
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: commonPalette.borderRadius.large,
                        boxShadow: palette.shadow,
                        border: `1px solid ${palette.border}`,
                        transition: commonPalette.transitions.medium,
                        background: palette.background.card,
                        '&:hover': {
                            boxShadow: palette.shadowHover,
                            transform: 'translateY(-2px)',
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: commonPalette.borderRadius.medium,
                        background: palette.background.paper,
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        background: themeMode === 'light'
                            ? colors.primary.gradient
                            : colors.dark.gradient,
                        boxShadow: themeMode === 'light'
                            ? colors.shadow.light.primary
                            : colors.shadow.dark.primary,
                    },
                },
            },
            MuiFab: {
                styleOverrides: {
                    root: {
                        boxShadow: palette.shadow,
                        background: `linear-gradient(135deg, ${palette.primary.main} 0%, ${palette.primary.dark} 100%)`,
                        '&:hover': {
                            boxShadow: palette.shadowHover,
                            background: `linear-gradient(135deg, ${palette.primary.dark} 0%, ${palette.primary.main} 100%)`,
                        },
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        transition: commonPalette.transitions.medium,
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            background: themeMode === 'light' ? colors.background.light : palette.background.card,
                            '&:hover': {
                                background: themeMode === 'light' ? colors.background.lightTertiary : palette.background.paper,
                            },
                            '&.Mui-focused': {
                                background: themeMode === 'light' ? colors.background.light : palette.background.card,
                            },
                        },
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        background: themeMode === 'light'
                            ? colors.overlay.light.primary
                            : colors.overlay.dark.primary,
                        color: themeMode === 'light'
                            ? palette.primary.main
                            : palette.primary.light,
                        border: `1px solid ${themeMode === 'light'
                            ? colors.overlay.light.secondary
                            : colors.overlay.dark.secondary}`,
                    },
                },
            },
            MuiCssBaseline: {
                styleOverrides: {
                    '*::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px',
                    },
                    '*::-webkit-scrollbar-track': {
                        background: 'transparent',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        background: themeMode === 'light'
                            ? colors.overlay.light.dark
                            : colors.overlay.dark.light,
                        borderRadius: '4px',
                        '&:hover': {
                            background: themeMode === 'light'
                                ? colors.overlay.light.dark.replace('0.1', '0.3')
                                : colors.overlay.dark.light.replace('0.1', '0.3'),
                        },
                    },
                    '*::-webkit-scrollbar-corner': {
                        background: 'transparent',
                    },
                    body: {
                        background: palette.background.default,
                        color: palette.text.primary,
                    },
                },
            },
        },
    });

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}; 