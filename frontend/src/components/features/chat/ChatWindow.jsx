import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages, currentUserId }) {
  const endRef = useRef(null);

  // Auto-scroll to the bottom whenever messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 border border-gray-200 p-4 bg-gray-50 overflow-y-auto rounded shadow-inner" style={{ minHeight: '400px', maxHeight: '60vh' }}>
      {messages.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">No messages yet. Say hi!</div>
      ) : (
        messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg} 
            isOwnMessage={msg.senderId === currentUserId} 
          />
        ))
      )}
      <div ref={endRef} />
    </div>
  );
}