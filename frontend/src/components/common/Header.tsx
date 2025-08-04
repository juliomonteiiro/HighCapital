import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Box,
    Tooltip,
} from '@mui/material';
import {
    Logout,
    Brightness4,
    Brightness7,
    Person,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';
import { useColors } from '../../hooks/useColors';
import logo from '../../assets/logo.png';

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = () => {
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
    const { user, logout } = useAuth();
    const { themeMode, toggleTheme } = useCustomTheme();
    const colors = useColors();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleProfile = () => {
        setUserMenuAnchor(null);
        navigate('/profile');
    };

    return (
        <AppBar
            position="static"
            sx={{
                background: themeMode === 'light'
                    ? colors.primaryGradient
                    : colors.darkGradient,
                boxShadow: colors.shadow.primary,
                width: '100%',
                borderRadius: 0,
            }}
        >
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img 
                        src={logo} 
                        alt="HighCapital Logo" 
                        style={{
                            height: '50px',
                            width: 'auto',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/')}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
                    <Tooltip title={`Alternar para tema ${themeMode === 'light' ? 'escuro' : 'claro'}`}>
                        <IconButton
                            color="inherit"
                            onClick={toggleTheme}
                            sx={{ mr: 1 }}
                        >
                            {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Menu do usuário">
                        <IconButton
                            color="inherit"
                            onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                        >
                            <Avatar sx={{ width: 32, height: 32, bgcolor: colors.border.avatar }}>
                                {user?.name?.charAt(0)?.toUpperCase()}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>

                <Menu
                    anchorEl={userMenuAnchor}
                    open={Boolean(userMenuAnchor)}
                    onClose={() => setUserMenuAnchor(null)}
                >
                    <MenuItem onClick={handleProfile}>
                        <Person sx={{ mr: 1 }} />
                        Perfil
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <Logout sx={{ mr: 1 }} />
                        Sair
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;