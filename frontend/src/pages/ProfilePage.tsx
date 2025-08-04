import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Alert,
    Divider,
    Avatar,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    Person,
    Email,
    Edit,
    Save,
    Cancel,
    Lock,
    Delete,
    ArrowBack,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { useUser } from '../hooks/useUser';
import { useForm } from '../hooks/useForm';
import { authValidationRules } from '../utils/validation';
import { authService } from '../services/authService';
import { useColors } from '../hooks/useColors';

const ProfilePage: React.FC = () => {
    const theme = useTheme();
    const colors = useColors();
    const navigate = useNavigate();
    const { profile, loading, error, updateProfile, updatePassword, deleteAccount } = useUser();

    const [editMode, setEditMode] = useState(false);
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const {
        formData: profileData,
        errors: profileErrors,
        submitError: profileSubmitError,
        setFormData: setProfileData,
        setSubmitError: setProfileSubmitError,
        validateForm: validateProfileForm,
        handleInputChange: handleProfileInputChange,
        resetForm: resetProfileForm,
    } = useForm({
        name: profile?.name || '',
        email: profile?.email || '',
    }, {
        name: authValidationRules.name,
        email: authValidationRules.email,
    });

    const {
        formData: passwordData,
        errors: passwordErrors,
        submitError: passwordSubmitError,
        setSubmitError: setPasswordSubmitError,
        validateForm: validatePasswordForm,
        handleInputChange: handlePasswordInputChange,
        resetForm: resetPasswordForm,
    } = useForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    }, {
        currentPassword: (value) => !value ? 'Senha atual é obrigatória' : undefined,
        newPassword: authValidationRules.password,
        confirmPassword: (value) => {
            if (!value) return 'Confirmação de senha é obrigatória';
            if (value !== passwordData.newPassword) return 'Senhas não coincidem';
            return undefined;
        },
    });

    React.useEffect(() => {
        if (profile) {
            setProfileData({
                name: profile.name,
                email: profile.email,
            });
        }
    }, [profile, setProfileData]);

    const handleSaveProfile = async () => {
        if (!validateProfileForm()) return;

        try {
            await updateProfile(profileData);
            setEditMode(false);
            setSuccessMessage('Perfil atualizado com sucesso!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err: any) {
            setProfileSubmitError(err.response?.data?.message || 'Erro ao atualizar perfil');
        }
    };

    const handleChangePassword = async () => {
        if (!validatePasswordForm()) return;

        try {
            await updatePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            setPasswordDialogOpen(false);
            resetPasswordForm();
            setSuccessMessage('Senha alterada com sucesso!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err: any) {
            setPasswordSubmitError(err.response?.data?.message || 'Erro ao alterar senha');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount();
            await authService.logout();
            navigate('/login');
        } catch (err: any) {
            setDeleteDialogOpen(false);
            setProfileSubmitError(err.response?.data?.message || 'Erro ao deletar conta');
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        resetProfileForm();
        setProfileSubmitError('');
    };

    if (loading) {
        return <LoadingSpinner fullHeight />;
    }

    if (!profile) {
        return (
            <Box>
                <Header />
                <Container sx={{ padding: 3 }}>
                    <Alert severity="error">Erro ao carregar perfil</Alert>
                </Container>
            </Box>
        );
    }

    return (
        <Box>
            <Header />

            <Container sx={{ padding: 3, maxWidth: 'md' }}>
                <Box sx={{ marginBottom: 3 }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBack />}
                        onClick={() => navigate('/')}
                        sx={{
                            borderRadius: 2,
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            '&:hover': {
                                borderColor: theme.palette.primary.dark,
                                backgroundColor: colors.overlay.primary,
                            }
                        }}
                    >
                        Voltar para Home
                    </Button>
                </Box>

                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                    Perfil do Usuário
                </Typography>

                {successMessage && (
                    <Alert severity="success" sx={{ marginBottom: 3, borderRadius: 2 }}>
                        {successMessage}
                    </Alert>
                )}

                {error && (
                    <Alert severity="error" sx={{ marginBottom: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                <Card sx={{ marginBottom: 3, borderRadius: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 3 }}>
                            <Avatar
                                sx={{
                                    width: 64,
                                    height: 64,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                }}
                            >
                                {profile?.name?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" fontWeight={600}>
                                    {profile.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {profile.email}
                                </Typography>
                            </Box>
                            <Button
                                variant="outlined"
                                startIcon={editMode ? <Cancel /> : <Edit />}
                                onClick={editMode ? handleCancelEdit : () => setEditMode(true)}
                                sx={{ borderRadius: 2 }}
                            >
                                {editMode ? 'Cancelar' : 'Editar'}
                            </Button>
                        </Box>

                        <Divider sx={{ marginBottom: 3 }} />

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Nome"
                                value={profileData.name}
                                onChange={handleProfileInputChange('name')}
                                error={!!profileErrors.name}
                                helperText={profileErrors.name}
                                disabled={!editMode}
                                fullWidth
                                InputProps={{
                                    startAdornment: <Person sx={{ marginRight: 1, color: 'text.secondary' }} />,
                                }}
                            />

                            <TextField
                                label="Email"
                                value={profileData.email}
                                onChange={handleProfileInputChange('email')}
                                error={!!profileErrors.email}
                                helperText={profileErrors.email}
                                disabled={!editMode}
                                fullWidth
                                InputProps={{
                                    startAdornment: <Email sx={{ marginRight: 1, color: 'text.secondary' }} />,
                                }}
                            />

                            {editMode && (
                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<Save />}
                                        onClick={handleSaveProfile}
                                        sx={{ borderRadius: 2 }}
                                    >
                                        Salvar
                                    </Button>
                                </Box>
                            )}

                            {profileSubmitError && (
                                <Alert severity="error" sx={{ borderRadius: 2 }}>
                                    {profileSubmitError}
                                </Alert>
                            )}
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{ marginBottom: 3, borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Segurança
                        </Typography>
                        <Divider sx={{ marginBottom: 3 }} />

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Button
                                variant="outlined"
                                startIcon={<Lock />}
                                onClick={() => setPasswordDialogOpen(true)}
                                sx={{ borderRadius: 2, justifyContent: 'flex-start', padding: 2 }}
                            >
                                Alterar Senha
                            </Button>

                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<Delete />}
                                onClick={() => setDeleteDialogOpen(true)}
                                sx={{ borderRadius: 2, justifyContent: 'flex-start', padding: 2 }}
                            >
                                Deletar Conta
                            </Button>
                        </Box>
                    </CardContent>
                </Card>

                <Card sx={{ borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Informações da Conta
                        </Typography>
                        <Divider sx={{ marginBottom: 3 }} />

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Data de Criação
                                </Typography>
                                <Typography variant="body2">
                                    {new Date(profile.createdAt).toLocaleDateString('pt-BR')}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Última Atualização
                                </Typography>
                                <Typography variant="body2">
                                    {new Date(profile.updatedAt).toLocaleDateString('pt-BR')}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Container>

            <Dialog
                open={passwordDialogOpen}
                onClose={() => setPasswordDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Alterar Senha</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 1 }}>
                        <TextField
                            label="Senha Atual"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordInputChange('currentPassword')}
                            error={!!passwordErrors.currentPassword}
                            helperText={passwordErrors.currentPassword}
                            fullWidth
                        />

                        <TextField
                            label="Nova Senha"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordInputChange('newPassword')}
                            error={!!passwordErrors.newPassword}
                            helperText={passwordErrors.newPassword}
                            fullWidth
                        />

                        <TextField
                            label="Confirmar Nova Senha"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordInputChange('confirmPassword')}
                            error={!!passwordErrors.confirmPassword}
                            helperText={passwordErrors.confirmPassword}
                            fullWidth
                        />

                        {passwordSubmitError && (
                            <Alert severity="error" sx={{ borderRadius: 2 }}>
                                {passwordSubmitError}
                            </Alert>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPasswordDialogOpen(false)}>Cancelar</Button>
                    <Button
                        variant="contained"
                        onClick={handleChangePassword}
                        disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    >
                        Alterar Senha
                    </Button>
                </DialogActions>
            </Dialog>

            <ConfirmDialog
                open={deleteDialogOpen}
                title="Deletar Conta"
                message="Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita e todos os seus dados serão perdidos permanentemente."
                confirmText="Deletar Conta"
                cancelText="Cancelar"
                onConfirm={handleDeleteAccount}
                onCancel={() => setDeleteDialogOpen(false)}
                severity="error"
            />
        </Box>
    );
};

export default ProfilePage; 