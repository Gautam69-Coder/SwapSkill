import { formatDate } from '../../../utils/formatDate';

export default function MessageBubble({ message, isOwnMessage }) {
  return (
    <div className={`flex w-full mb-4 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[75%] p-3 rounded-lg shadow-sm ${
        isOwnMessage 
          ? 'bg-blue-600 text-white rounded-br-none' 
          : 'bg-gray-200 text-gray-800 rounded-bl-none'
      }`}>
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        <span className={`text-[10px] block mt-1 text-right ${isOwnMessage ? 'text-blue-200' : 'text-gray-500'}`}>
          {formatDate(message.timestamp)}
        </span>
      </div>
    </div>
  );
}