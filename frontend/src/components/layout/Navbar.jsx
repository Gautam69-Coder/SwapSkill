import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="p-4 border-b bg-white flex justify-between items-center shadow-sm">
      <Link to="/" className="text-xl font-bold text-blue-600">SkillSwap</Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Link to="/feed" className="text-gray-600 hover:text-blue-600">Feed</Link>
            <Link to="/create-post" className="text-gray-600 hover:text-blue-600">Create Post</Link>
            <Link to="/connections" className="text-gray-600 hover:text-blue-600">Connections</Link>
            <Link to="/profile" className="text-gray-600 hover:text-blue-600">Profile</Link>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700 ml-4">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
            <Link to="/signup" className="text-gray-600 hover:text-blue-600">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}