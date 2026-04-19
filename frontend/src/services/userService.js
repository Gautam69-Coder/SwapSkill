import api from '../config/axiosConfig';

// Mock user profiles database
const mockProfiles = {};
// Mock connections database
const mockConnections = {};

export const getUserProfile = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!mockProfiles[id]) {
    mockProfiles[id] = {
      skillsHave: '',
      skillsWant: '',
      skillLevel: 'Beginner',
    };
  }
  
  return { data: mockProfiles[id] };
};

export const updateUserProfile = async (id, profileData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  mockProfiles[id] = { ...mockProfiles[id], ...profileData };
  return { data: mockProfiles[id] };
};

export const getConnections = async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { data: mockConnections[userId] || [] };
};

export const createConnection = async (userId, targetUserId, targetUserName, skillHave, skillWant) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!mockConnections[userId]) mockConnections[userId] = [];
  
  // Avoid duplicate connections
  const exists = mockConnections[userId].find(c => c.connectedUserId === targetUserId);
  if (exists) return { data: exists };
  
  const newConnection = {
    id: Date.now(),
    connectedUserId: targetUserId,
    name: targetUserName,
    matchedSkill: skillWant,
    offeredSkill: skillHave
  };
  
  mockConnections[userId].push(newConnection);
  return { data: newConnection };
};