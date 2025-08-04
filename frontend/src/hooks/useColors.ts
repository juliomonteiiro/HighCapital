import { useTheme as useCustomTheme } from '../contexts/ThemeContext';
import { colors } from '../constants/colors';

export const useColors = () => {
    const { themeMode } = useCustomTheme();

    const isLight = themeMode === 'light';

    return {
        background: isLight ? colors.background.light : colors.dark.primary,
        backgroundSecondary: isLight ? colors.background.lightSecondary : colors.dark.secondary,
        backgroundTertiary: isLight ? colors.background.lightTertiary : colors.dark.secondary,
        backgroundDisabled: isLight ? colors.background.disabled : colors.dark.secondary,
        backgroundGradient: isLight ? colors.background.gradient : colors.dark.gradient,
        primaryGradient: colors.primary.gradient,
        darkGradient: colors.dark.gradient,

        shadow: {
            primary: isLight ? colors.shadow.light.primary : colors.shadow.dark.primary,
            card: colors.shadow.light.card,
            small: colors.shadow.light.small,
            large: colors.shadow.light.large,
        },

        border: colors.border,

        text: colors.text,

        state: colors.state,

        overlay: isLight ? colors.overlay.light : colors.overlay.dark,

        primary: colors.primary,
        dark: colors.dark,

        isLight,
        isDark: !isLight,
    };
}; 