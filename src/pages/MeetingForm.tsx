import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  Stack,
  Typography
} from '@mui/material';

import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

import { useForm, Controller } from 'react-hook-form';
import { getMeetingById, saveMeeting } from '../api/meetings';
import { useAuth } from '../contexts/AuthContext';

interface MeetingFormData {
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  participants: string;
  status: 'Zaplanowane' | 'ukonczone' | 'odwolane';
}

export default function MeetingForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<MeetingFormData>({
    defaultValues: {
      title: '',
      description: '',
      date: new Date(),
      startTime: '',
      endTime: '',
      participants: '',
      status: 'Zaplanowane'
    }
  });

  const [calendarDate, setCalendarDate] = useState<Date>(new Date());

  useEffect(() => {
    if (isEdit && id) {
      getMeetingById(Number(id)).then((m) => {
        setValue('title', m.title);
        setValue('description', m.description);
        setValue('date', new Date(m.date));
        setCalendarDate(new Date(m.date));
        setValue('startTime', m.startTime);
        setValue('endTime', m.endTime);
        setValue('participants', m.participants);
        setValue('status', m.status as MeetingFormData['status']);
      });
    }
  }, [id, isEdit, setValue]);

  const onSubmit = async (data: MeetingFormData) => {
    const payload = {
      ...data,
      date: data.date.toISOString().split('T')[0]
    };
    try {
      await saveMeeting({
        ...payload,
        id: isEdit ? Number(id) : undefined
      });
      navigate('/meetings');
    } catch (err) {
      console.error('Błąd zapisu spotkania:', err);
      alert('Nie udało się zapisać spotkania.');
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edytuj spotkanie' : 'Nowe spotkanie'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* Tytuł */}
          <TextField
            label="Tytuł"
            {...register('title', { required: 'Tytuł jest wymagany' })}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            fullWidth
          />

          {/* Opis */}
          <TextField
            label="Opis"
            multiline
            rows={4}
            {...register('description')}
            fullWidth
          />

          {/* Kalendarz */}
          <Controller
            control={control}
            name="date"
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Wybierz datę:
                </Typography>
                <Calendar
                  onChange={(d: Date) => {
                    field.onChange(d);
                    setCalendarDate(d);
                  }}
                  value={calendarDate}
                  tileDisabled={({ date }) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Wybrana data:{' '}
                  <strong>
                    {calendarDate.toLocaleDateString('pl-PL', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </strong>
                </Typography>
              </>
            )}
          />

          {/* Godzina rozpoczęcia */}
          <TextField
            label="Godzina rozpoczęcia"
            type="time"
            {...register('startTime', {
              required: 'Godzina startu jest wymagana'
            })}
            error={Boolean(errors.startTime)}
            helperText={errors.startTime?.message}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
            sx={{ width: '200px' }}
          />

          {/* Godzina zakończenia */}
          <TextField
            label="Godzina zakończenia"
            type="time"
            {...register('endTime', {
              required: 'Godzina końca jest wymagana'
            })}
            error={Boolean(errors.endTime)}
            helperText={errors.endTime?.message}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
            sx={{ width: '200px' }}
          />
          {/* Uczestnicy */}
          <TextField
            label="Uczestnicy (e-maile, oddzielone przecinkiem)"
            {...register('participants')}
            placeholder="user1@ex.com,user2@ex.com"
            fullWidth
          />

          {/* Status */}
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <TextField select label="Status" {...field} sx={{ width: '200px' }}>
                <MenuItem value="Zaplanowane">Zaplanowane</MenuItem>
                <MenuItem value="ukonczone">Zakończone</MenuItem>
                <MenuItem value="odwolane">Anulowane</MenuItem>
              </TextField>
            )}
          />

          {/* Przycisk submit */}
          <Button type="submit" variant="contained">
            {isEdit ? 'Zapisz zmiany' : 'Utwórz spotkanie'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
