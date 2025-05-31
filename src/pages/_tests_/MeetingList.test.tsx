import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import MeetingList from '../MeetingList';
import { getMeetings } from '../../api/meetings';


jest.mock(
  '@mui/icons-material',
  () => ({
    Edit: () => <span data-testid="mock-edit-icon" />,
    Delete: () => <span data-testid="mock-delete-icon" />,
    CalendarToday: () => <span data-testid="mock-calendar-icon" />,
    TableRows: () => <span data-testid="mock-tablerows-icon" />,
  }),
  { virtual: true }
);

jest.mock('../../api/meetings', () => ({
  getMeetings: jest.fn(),
  deleteMeeting: jest.fn(),
}));

describe('MeetingList', () => {
  const fakeMeetings = [
    { id: 1, title: 'Spotkanie A', description: 'Opis A', date: '2025-06-01' },
    { id: 2, title: 'Spotkanie B', description: 'Opis B', date: '2025-06-02' },
  ];

  beforeEach(() => {
    (getMeetings as jest.Mock).mockResolvedValue(fakeMeetings);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('powinien wyrenderować tabelę ze spotkaniami', async () => {
    const mockUser = { id: 1, email: 'admin@ex.com', role: 'admin', token: 'dummy-token' };

    render(
      <AuthContext.Provider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <MeetingList />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(getMeetings).toHaveBeenCalled();
    });

    expect(screen.getByText('Spotkanie A')).toBeInTheDocument();
    expect(screen.getByText('Opis A')).toBeInTheDocument();
    expect(screen.getByText('Spotkanie B')).toBeInTheDocument();
    expect(screen.getByText('Opis B')).toBeInTheDocument();

    expect(screen.getAllByTestId('mock-edit-icon').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('mock-delete-icon').length).toBeGreaterThan(0);
  });
});
