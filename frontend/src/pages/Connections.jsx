import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import * as userService from '../services/userService';
import ConnectionCard from '../components/features/connection/ConnectionCard';

export default function Connections() {
  const { user } = useAuth();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      userService.getConnections(user.id).then((res) => {
        setConnections(res.data);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 mt-10">Loading connections...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Connections</h1>
      
      {connections.length === 0 ? (
        <div className="text-center py-12 bg-white border rounded shadow-sm">
          <p className="text-gray-500 text-lg">You don't have any connections yet.</p>
          <p className="text-gray-400 mt-2">Go to the Feed and accept a request to start swapping skills!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {connections.map(conn => (
            <ConnectionCard key={conn.id} connection={conn} />
          ))}
        </div>
      )}
    </div>
  );
}