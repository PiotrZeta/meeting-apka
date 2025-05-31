import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import { AuthProvider, useAuth } from '../AuthContext';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function TestComponent() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="user-email">{user?.email || 'null'}</div>
      <button
        data-testid="login-btn"
        onClick={() => login('admin@ex.com', 'admin')}
      >
        Log in
      </button>
      <button data-testid="logout-btn" onClick={() => logout()}>
        Log out
      </button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('po poprawnym loginie powinien zapisać usera w localStorage i zwrócić obiekt user', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          email: 'admin@ex.com',
          role: 'admin'
        }
      ]
    });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByTestId('user-email').textContent).toBe('null');

    await act(async () => {
      getByTestId('login-btn').click();
    });

    await waitFor(() => {
      expect(getByTestId('user-email').textContent).toBe('admin@ex.com');
    });

    const stored = JSON.parse(localStorage.getItem('meetingAppUser')!);
    expect(stored.email).toBe('admin@ex.com');
    expect(stored.role).toBe('admin');
  });

  it('po wylogowaniu user powinien być null, a localStorage puste', async () => {
    localStorage.setItem(
      'meetingAppUser',
      JSON.stringify({ id: 1, email: 'u@e.com', role: 'user', token: 'xxx' })
    );

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByTestId('user-email').textContent).toBe('u@e.com');

    act(() => {
      getByTestId('logout-btn').click();
    });

    expect(getByTestId('user-email').textContent).toBe('null');
    expect(localStorage.getItem('meetingAppUser')).toBeNull();
  });
});
