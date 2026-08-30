/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CRM from './pages/CRM';
import Pedidos from './pages/Pedidos';
import Clientes from './pages/Clientes';
import PublicForm from './pages/PublicForm';
import Login from './pages/Login';
import ThreadsAutopilotPage from './pages/ThreadsAutopilot/ThreadsAutopilotPage';
import ThreadsPrivacyPage from './pages/ThreadsAutopilot/ThreadsPrivacyPage';
import ThreadsDeletionPage from './pages/ThreadsAutopilot/ThreadsDeletionPage';
import ThreadsTermsPage from './pages/ThreadsAutopilot/ThreadsTermsPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Threads Autopilot Public Transparency & Compliance Routes */}
        <Route path="/threads-autopilot" element={<ThreadsAutopilotPage />} />
        <Route path="/threads-autopilot/privacidade" element={<ThreadsPrivacyPage />} />
        <Route path="/threads-autopilot/exclusao-de-dados" element={<ThreadsDeletionPage />} />
        <Route path="/threads-autopilot/termos-de-uso" element={<ThreadsTermsPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes (Protected) */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/clientes" element={<Clientes />} />
        </Route>

        {/* Public Routes */}
        <Route path="/f/:formId" element={<PublicForm />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
