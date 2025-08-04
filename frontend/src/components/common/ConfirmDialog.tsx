import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    useTheme,
} from '@mui/material';
import { useColors } from '../../hooks/useColors';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    severity?: 'warning' | 'error' | 'info';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onConfirm,
    onCancel,
    severity = 'warning',
}) => {
    const theme = useTheme();
    const colors = useColors();

    const getConfirmButtonColor = () => {
        switch (severity) {
            case 'error':
                return 'error';
            case 'warning':
                return 'warning';
            default:
                return 'primary';
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="sm"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 2,
                },
            }}
        >
            <DialogTitle
                sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                }}
            >
                {title}
            </DialogTitle>
            <DialogContent sx={{ padding: 3 }}>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: 2, gap: 1.5 }}>
                <Button
                    onClick={onCancel}
                    variant="outlined"
                    sx={{
                        borderRadius: 1.5,
                        height: 40,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: 14,
                        minWidth: 100,
                        borderColor: theme.palette.error.main,
                        color: theme.palette.error.main,
                        '&:hover': {
                            borderColor: theme.palette.error.dark,
                            backgroundColor: colors.state.error.background.light,
                        }
                    }}
                >
                    {cancelText}
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color={getConfirmButtonColor()}
                    autoFocus
                    sx={{
                        borderRadius: 1.5,
                        height: 40,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: 14,
                        minWidth: 100,
                        background: `linear-gradient(135deg, ${theme.palette[getConfirmButtonColor()].main} 0%, ${theme.palette[getConfirmButtonColor()].dark} 100%)`,
                        '&:hover': {
                            background: `linear-gradient(135deg, ${theme.palette[getConfirmButtonColor()].dark} 0%, ${theme.palette[getConfirmButtonColor()].main} 100%)`,
                        }
                    }}
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog; 