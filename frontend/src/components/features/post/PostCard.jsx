import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import * as userService from '../../../services/userService';
import { formatDate } from '../../../utils/formatDate';
import Button from '../../common/Button';

export default function PostCard({ post }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);

  // If the post belongs to the current user, we don't show the connect button
  const isOwnPost = user?.id === post.authorId;

  const handleConnect = async () => {
    setConnecting(true);
    await userService.createConnection(
      user.id, 
      post.authorId, 
      post.author, 
      post.skillHave, 
      post.skillWant
    );
    setConnecting(false);
    navigate('/connections'); // Redirect to see the new connection
  };

  return (
    <div className="p-5 border rounded shadow-sm bg-white mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{post.author}</h3>
          <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1 bg-green-50 p-3 rounded border border-green-100">
          <p className="text-xs text-green-700 font-bold uppercase tracking-wider mb-1">Can Teach</p>
          <p className="font-medium text-gray-800">{post.skillHave}</p>
        </div>
        <div className="flex-1 bg-blue-50 p-3 rounded border border-blue-100">
          <p className="text-xs text-blue-700 font-bold uppercase tracking-wider mb-1">Wants to Learn</p>
          <p className="font-medium text-gray-800">{post.skillWant}</p>
        </div>
      </div>
      
      <div className="border-t pt-3 mb-3">
        <p className="text-gray-700">{post.description}</p>
      </div>

      {!isOwnPost && (
        <div className="flex justify-end border-t pt-3 mt-2">
          <Button onClick={handleConnect} disabled={connecting}>
            {connecting ? 'Connecting...' : 'Accept Request'}
          </Button>
        </div>
      )}
    </div>
  );
}