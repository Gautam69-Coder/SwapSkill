// Mock messages database
// Key is a combination of userId1_userId2 to represent a unique chat room
const mockMessages = {};

const getRoomId = (userA, userB) => {
  return [userA, userB].sort().join('_');
};

export const getMessages = async (currentUserId, targetUserId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const roomId = getRoomId(currentUserId, targetUserId);
  
  if (!mockMessages[roomId]) {
    // Generate a default first message if the chat is empty
    mockMessages[roomId] = [
      { 
        id: Date.now() - 10000, 
        senderId: Number(targetUserId), // The other person sent it
        text: 'Hi there! Thanks for accepting my request. Looking forward to swapping skills.', 
        timestamp: new Date(Date.now() - 60000).toISOString() 
      }
    ];
  }
  
  return { data: mockMessages[roomId] };
};

export const sendMessage = async (currentUserId, targetUserId, text) => {
  await new Promise(resolve => setTimeout(resolve, 200)); // Fast send delay
  
  const roomId = getRoomId(currentUserId, targetUserId);
  
  if (!mockMessages[roomId]) mockMessages[roomId] = [];
  
  const newMessage = {
    id: Date.now(),
    senderId: currentUserId,
    text,
    timestamp: new Date().toISOString()
  };
  
  mockMessages[roomId].push(newMessage);
  return { data: newMessage };
};