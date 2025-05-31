import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect
} from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  role: 'admin' | 'user';
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('meetingAppUser');
    if (stored) {
      const u: User = JSON.parse(stored);
      setUser(u);
      axios.defaults.headers.common['Authorization'] = `Bearer ${u.token}`;
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.get<User[]>(
      `http://localhost:4000/users`,
      { params: { email, password } }
    );

    if (res.data.length !== 1) {
      throw new Error('Nieprawidłowy email lub hasło');
    }

    const u = res.data[0];
    const token = btoa(`${u.id}:${u.email}`);
    const loggedUser: User = {
      id: u.id,
      email: u.email,
      role: u.role,
      token
    };

    setUser(loggedUser);
    localStorage.setItem('meetingAppUser', JSON.stringify(loggedUser));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('meetingAppUser');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
