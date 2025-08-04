import React, { useRef, useEffect } from 'react';
import { Box, TextField, IconButton, useTheme } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useColors } from '../../hooks/useColors';

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend, disabled = false }) => {
    const theme = useTheme();
    const colors = useColors();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };
    
    useEffect(() => {
        if (!disabled && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disabled]);

    return (
        <Box
            sx={{
                padding: 2,
                background: theme.palette.background.paper,
                borderTop: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                gap: 1.5,
                alignItems: 'flex-end',
            }}
        >
            <TextField
                inputRef={inputRef}
                fullWidth
                multiline
                maxRows={4}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                disabled={disabled}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        background: theme.palette.background.paper,
                        '&:hover': {
                            background: colors.backgroundTertiary,
                        },
                        '&.Mui-focused': {
                            background: theme.palette.background.paper,
                        },
                    },
                }}
            />
            <IconButton
                onClick={onSend}
                disabled={!value.trim() || disabled}
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    color: theme.palette.primary.contrastText,
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    boxShadow: colors.shadow.small,
                    '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                        boxShadow: colors.shadow.large,
                        transform: 'scale(1.05)',
                    },
                    '&:disabled': {
                        background: theme.palette.action.disabledBackground,
                        color: theme.palette.action.disabled,
                        boxShadow: 'none',
                        transform: 'none',
                    },
                }}
            >
                <Send />
            </IconButton>
        </Box>
    );
};

export default ChatInput; 