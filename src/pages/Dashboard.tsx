import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Paper, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Witaj, {user?.email}!
      </Typography>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={() => navigate('/meetings')}>
          Przejdź do listy spotkań
        </Button>
        <Button variant="outlined" onClick={() => navigate('/meetings/new')}>
          Utwórz nowe spotkanie
        </Button>
        <Button variant="contained" onClick={handleLogout}>
          Wyloguj się
        </Button>
      </Stack>
    </Paper>
  );
}
