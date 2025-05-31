// src/components/Layout.tsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Meeting App
          </Typography>

          <Button color="inherit" component={RouterLink} to="/meetings">
            Lista spotkań
          </Button>

          <Button color="inherit" component={RouterLink} to="/meetings/new">
            Nowe spotkanie
          </Button>

          <Button color="inherit" onClick={handleLogout}>
            Wyloguj
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </>
  );
}
