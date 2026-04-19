import { Routes, Route, Navigate } from 'react-router-dom';
import Feed from '../pages/Feed';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';
import CreatePost from '../pages/CreatePost';
import Connections from '../pages/Connections';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/feed" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected Routes */}
      <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
      <Route path="/connections" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
      <Route path="/chat/:id" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
    </Routes>
  );
}