import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    // Check localStorage or default to light
    const [mode, setMode] = useState(() => {
        const savedMode = localStorage.getItem('themeMode');
        return savedMode ? savedMode : 'light';
    });

    // Update localStorage and HTML class when mode changes
    useEffect(() => {
        localStorage.setItem('themeMode', mode);
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [mode]);

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    // Create MUI theme based on current mode
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                            // Light mode palette overrides
                            primary: { main: '#1976d2' },
                            background: { default: '#f9fafb', paper: '#ffffff' },
                        }
                        : {
                            // Dark mode palette overrides
                            primary: { main: '#90caf9' },
                            background: { default: '#111827', paper: '#1f2937' },
                        }),
                },
            }),
        [mode]
    );

    const value = {
        mode,
        toggleColorMode,
    };

    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
