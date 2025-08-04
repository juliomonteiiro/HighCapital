export const colors = {
    primary: {
        light: '#2563eb',
        dark: '#1d4ed8',
        blue: '#3b82f6',
        gradient: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    },

    dark: {
        primary: '#1e293b',
        secondary: '#334155',
        gradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    },

    background: {
        light: '#ffffff',
        lightSecondary: '#f8f9fa',
        lightTertiary: '#f8fafc',
        disabled: '#f1f5f9',
        gradient: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    },

    border: {
        light: '#e9ecef',
        avatar: 'rgba(255,255,255,0.2)',
    },

    shadow: {
        light: {
            primary: '0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -1px rgba(37, 99, 235, 0.06)',
            card: '0 8px 40px rgba(0, 0, 0, 0.12)',
            small: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        dark: {
            primary: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        },
    },

    text: {
        primary: '#000000',
        secondary: '#6c757d',
        white: '#ffffff',
    },

    state: {
        error: {
            light: '#ef4444',
            dark: '#f87171',
            background: {
                light: 'rgba(239, 68, 68, 0.04)',
                dark: 'rgba(248, 113, 113, 0.08)',
            },
            hover: {
                light: 'rgba(239, 68, 68, 0.1)',
                dark: 'rgba(248, 113, 113, 0.2)',
            },
            active: {
                light: 'rgba(239, 68, 68, 0.2)',
                dark: 'rgba(248, 113, 113, 0.3)',
            },
        },
        success: {
            light: '#10b981',
            dark: '#34d399',
            background: {
                light: 'rgba(16, 185, 129, 0.1)',
                dark: 'rgba(52, 211, 153, 0.2)',
            },
            hover: {
                light: 'rgba(16, 185, 129, 0.2)',
                dark: 'rgba(52, 211, 153, 0.3)',
            },
        },
        warning: {
            light: '#f59e0b',
            dark: '#fbbf24',
            background: {
                light: 'rgba(245, 158, 11, 0.1)',
                dark: 'rgba(251, 191, 36, 0.2)',
            },
             hover: {
                light: 'rgba(245, 158, 11, 0.2)',
                dark: 'rgba(251, 191, 36, 0.3)',
             },
        },
        info: {
            light: '#3b82f6',
            dark: '#60a5fa',
            background: {
                light: 'rgba(59, 130, 246, 0.1)',
                dark: 'rgba(96, 165, 250, 0.2)',
            },
            hover: {
                light: 'rgba(59, 130, 246, 0.2)',
                dark: 'rgba(96, 165, 250, 0.3)',
            },
        },
    },

    overlay: {
        light: {
            primary: 'rgba(37, 99, 235, 0.1)',
            secondary: 'rgba(37, 99, 235, 0.2)',
            dark: 'rgba(0, 0, 0, 0.1)',
            lightGray: 'rgba(0, 0, 0, 0.05)',
        },
        dark: {
            primary: 'rgba(59, 130, 246, 0.2)',
            secondary: 'rgba(59, 130, 246, 0.3)',
            light: 'rgba(255, 255, 255, 0.1)',
            lightGray: 'rgba(255, 255, 255, 0.05)',
        },
    },
} as const;

export type ColorTheme = typeof colors;
export type ColorKey = keyof ColorTheme; 