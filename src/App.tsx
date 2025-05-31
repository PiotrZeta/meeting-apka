import 'react-calendar/dist/Calendar.css';
import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { getMeetings } from './api/meetings';

function App() {
  useEffect(() => {
    getMeetings()
      .then(data => {
        console.log('MEETINGS:', data);
      })
      .catch(err => {
        console.error('API ERROR:', err);
      });
  }, []);

  return <AppRoutes />;
}

export default App;
