import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Stack
} from '@mui/material';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, margin: '80px auto' }}>
      <Typography variant="h5" gutterBottom>
        Logowanie
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            {...register('email', {
              required: 'Email jest wymagany',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Nieprawidłowy format email'
              }
            })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            label="Hasło"
            type="password"
            {...register('password', { required: 'Hasło jest wymagane' })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            Zaloguj się
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
