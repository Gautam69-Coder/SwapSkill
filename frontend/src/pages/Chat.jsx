import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import * as chatService from '../services/chatService';
import ChatWindow from '../components/features/chat/ChatWindow';
import MessageInput from '../components/features/chat/MessageInput';

export default function Chat() {
  const { id: targetUserId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // If no target user ID in URL, redirect back
    if (!targetUserId) {
      navigate('/connections');
      return;
    }

    if (user) {
      chatService.getMessages(user.id, targetUserId).then((res) => {
        setMessages(res.data);
        setLoading(false);
      });
    }
  }, [user, targetUserId, navigate]);

  const handleSendMessage = async (text) => {
    setSending(true);
    const res = await chatService.sendMessage(user.id, targetUserId, text);
    // Add the new message to the local state so it appears immediately
    setMessages((prev) => [...prev, res.data]);
    setSending(false);
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500 mt-10">Loading chat...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/connections')}
          className="text-blue-600 hover:text-blue-800 mr-4 font-medium flex items-center"
        >
          &larr; Back to Connections
        </button>
      </div>
      
      <div className="bg-white border rounded shadow-sm flex flex-col p-4 h-[75vh]">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-4">Skill Swap Chat</h2>
        <ChatWindow messages={messages} currentUserId={user.id} />
        <MessageInput onSendMessage={handleSendMessage} disabled={sending} />
      </div>
    </div>
  );
}