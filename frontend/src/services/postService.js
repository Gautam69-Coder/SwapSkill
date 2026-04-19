// Mock database of posts
let mockPosts = [
  { 
    id: 1, 
    author: 'Alice (Demo)', 
    authorId: 999, 
    skillHave: 'React & Tailwind', 
    skillWant: 'Python for Data Science', 
    description: 'I can help you build beautiful frontends in exchange for an introduction to Python data analysis.', 
    createdAt: new Date(Date.now() - 1000000).toISOString() 
  },
  { 
    id: 2, 
    author: 'Bob (Demo)', 
    authorId: 888, 
    skillHave: 'Graphic Design', 
    skillWant: 'Basic HTML/CSS', 
    description: 'I am a designer looking to learn how to code my own portfolio. I can design a logo or UI for you!', 
    createdAt: new Date(Date.now() - 500000).toISOString() 
  }
];

export const getPosts = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Sort posts by newest first
  const sortedPosts = [...mockPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return { data: sortedPosts };
};

export const createPost = async (postData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newPost = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...postData
  };
  
  mockPosts.push(newPost);
  return { data: newPost };
};