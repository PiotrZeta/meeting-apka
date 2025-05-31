import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Typography
} from '@mui/material';
import { Edit, Delete, CalendarToday, AccessTime } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { getMeetings, deleteMeeting, Meeting } from '../api/meetings';
import { useNavigate } from 'react-router-dom';

export default function MeetingList() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getMeetings().then((data) => {
      if (user?.role !== 'admin') {
        setMeetings(
          data.filter((m) =>
            m.participants.split(',').includes(user.email)
          )
        );
      } else {
        setMeetings(data);
      }
    });
  }, [user]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Czy na pewno chcesz usunąć to spotkanie?')) {
      await deleteMeeting(id);
      setMeetings((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/meetings/${id}/edit`);
  };

  if (meetings.length === 0) {
    return (
      <Typography sx={{ mt: 4 }}>
        Brak spotkań do wyświetlenia.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tytuł</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Godziny</TableCell>
            <TableCell>Uczestnicy</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Akcje</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetings.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.title}</TableCell>
              <TableCell>
                <CalendarToday
                  fontSize="small"
                  sx={{ verticalAlign: 'middle', mr: 0.5 }}
                />
                {new Date(m.date).toLocaleDateString('pl-PL')}
              </TableCell>
              <TableCell>
                <AccessTime
                  fontSize="small"
                  sx={{ verticalAlign: 'middle', mr: 0.5 }}
                />
                {m.startTime} – {m.endTime}
              </TableCell>
              <TableCell>{m.participants}</TableCell>
              <TableCell>{m.status}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => handleEdit(m.id)}
                  size="small"
                >
                  <Edit fontSize="inherit" />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(m.id)}
                  size="small"
                >
                  <Delete fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
