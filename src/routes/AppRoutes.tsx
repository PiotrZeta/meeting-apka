import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import MeetingList from '../pages/MeetingList';
import MeetingForm from '../pages/MeetingForm';

import RequireAuth from './RequireAuth';
import Layout from '../components/Layout';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Publiczna ścieżka logowania */}
      <Route path="/login" element={<LoginPage />} />

      {/* Ścieżki chronione: */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout>
              <Dashboard />
            </Layout>
          </RequireAuth>
        }
      />

      <Route
        path="/meetings"
        element={
          <RequireAuth>
            <Layout>
              <MeetingList />
            </Layout>
          </RequireAuth>
        }
      />

      <Route
        path="/meetings/new"
        element={
          <RequireAuth>
            <Layout>
              <MeetingForm />
            </Layout>
          </RequireAuth>
        }
      />

      <Route
        path="/meetings/:id/edit"
        element={
          <RequireAuth>
            <Layout>
              <MeetingForm />
            </Layout>
          </RequireAuth>
        }
      />

      {/* Każda inna ścieżka przekierowuje do /login lub do Dashboard */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
