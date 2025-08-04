import React from 'react';
import { CircularProgress, Box } from '@mui/material';

interface LoadingSpinnerProps {
    size?: number;
    fullHeight?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 40,
    fullHeight = false
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: fullHeight ? '100vh' : '200px',
            }}
        >
            <CircularProgress size={size} />
        </Box>
    );
};

export default LoadingSpinner; 