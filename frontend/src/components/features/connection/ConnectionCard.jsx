import { Link } from 'react-router-dom';

export default function ConnectionCard({ connection }) {
  return (
    <div className="p-4 border rounded shadow-sm bg-white flex justify-between items-center mb-3">
      <div>
        <h3 className="font-bold text-lg text-gray-800">{connection.name}</h3>
        <p className="text-sm text-gray-600 mt-1">
          Match: <span className="font-medium text-blue-600">{connection.matchedSkill}</span> ↔ <span className="font-medium text-green-600">{connection.offeredSkill}</span>
        </p>
      </div>
      
      <Link 
        to={`/chat/${connection.connectedUserId}`} 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium transition-colors"
      >
        Message
      </Link>
    </div>
  );
}