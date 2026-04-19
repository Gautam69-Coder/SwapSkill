// Mock users database to simulate a backend
// Load from localStorage if exists, otherwise empty array
const getMockUsers = () => {
  const users = localStorage.getItem('mockUsers');
  return users ? JSON.parse(users) : [];
};

const saveMockUsers = (users) => {
  localStorage.setItem('mockUsers', JSON.stringify(users));
};

export const login = async (data) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Dummy user for testing without signup
  if (data.email === 'test@test.com' && data.password === 'password') {
    return { data: { id: 1, name: 'Test User', email: 'test@test.com', token: 'mock-token-123' } };
  }
  
  const mockUsers = getMockUsers();
  const user = mockUsers.find(u => u.email === data.email && u.password === data.password);
  if (user) {
    return { data: { id: user.id, name: user.name, email: user.email, token: 'mock-token-123' } };
  }
  
  throw new Error('Invalid email or password');
};

export const signup = async (data) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const mockUsers = getMockUsers();
  if (mockUsers.find(u => u.email === data.email)) {
    throw new Error('User with this email already exists');
  }
  
  const newUser = { id: Date.now(), ...data };
  mockUsers.push(newUser);
  saveMockUsers(mockUsers);
  return { data: { id: newUser.id, name: newUser.name, email: newUser.email, token: 'mock-token-123' } };
};