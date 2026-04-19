import { useState } from 'react';
import Button from '../../common/Button';

export default function MessageInput({ onSendMessage, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4 border-t pt-4 bg-white">
      <input 
        type="text"
        placeholder="Type a message..." 
        className="flex-1 border p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        autoComplete="off"
      />
      <Button type="submit" disabled={disabled || !text.trim()} className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
        Send
      </Button>
    </form>
  );
}