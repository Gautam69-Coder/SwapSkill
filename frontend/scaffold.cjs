const fs = require('fs');
const path = require('path');

const dirs = [
  'src/assets/images',
  'src/components/common',
  'src/components/layout',
  'src/components/features/post',
  'src/components/features/chat',
  'src/components/features/connection',
  'src/config',
  'src/context',
  'src/hooks',
  'src/pages',
  'src/routes',
  'src/services',
  'src/utils',
];

dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

const files = {
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */\nexport default {\n  content: [\n    "./index.html",\n    "./src/**/*.{js,ts,jsx,tsx}",\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}`,
  'postcss.config.js': `export default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n}`,
  'src/assets/index.css': `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`,
  'src/components/common/Button.jsx': `export default function Button({ children, ...props }) {\n  return <button className="bg-blue-600 text-white px-4 py-2 rounded" {...props}>{children}</button>;\n}`,
  'src/components/common/Input.jsx': `export default function Input(props) {\n  return <input className="border p-2 rounded" {...props} />;\n}`,
  'src/components/common/Loader.jsx': `export default function Loader() {\n  return <div className="text-gray-500">Loading...</div>;\n}`,
  'src/components/layout/Navbar.jsx': `import { Link } from 'react-router-dom';\n\nexport default function Navbar() {\n  return (\n    <nav className="p-4 bg-gray-800 text-white flex gap-4">\n      <Link to="/" className="hover:text-gray-300">Home</Link>\n      <Link to="/chat" className="hover:text-gray-300">Chat</Link>\n      <Link to="/login" className="hover:text-gray-300">Login</Link>\n    </nav>\n  );\n}`,
  'src/components/layout/Footer.jsx': `export default function Footer() {\n  return <footer className="p-4 bg-gray-200 mt-auto text-center text-gray-600">&copy; 2026 Skill Swap</footer>;\n}`,
  'src/components/features/post/PostCard.jsx': `export default function PostCard({ title }) {\n  return <div className="p-4 border rounded shadow-sm mb-4">{title}</div>;\n}`,
  'src/components/features/chat/MessageBubble.jsx': `export default function MessageBubble({ message }) {\n  return <div className="p-2 bg-blue-100 rounded-lg mb-2 max-w-xs">{message}</div>;\n}`,
  'src/components/features/chat/ChatWindow.jsx': `export default function ChatWindow() {\n  return <div className="flex-1 border p-4 bg-gray-50 overflow-y-auto">Chat messages...</div>;\n}`,
  'src/components/features/chat/MessageInput.jsx': `export default function MessageInput() {\n  return <input placeholder="Type a message..." className="w-full border p-2 mt-2 rounded" />;\n}`,
  'src/components/features/connection/ConnectionCard.jsx': `export default function ConnectionCard({ name }) {\n  return <div className="p-4 border rounded shadow-sm">{name}</div>;\n}`,
  'src/config/axiosConfig.js': `import axios from 'axios';\n\nconst instance = axios.create({\n  baseURL: '/api'\n});\n\nexport default instance;`,
  'src/context/AuthContext.jsx': `import { createContext, useState } from 'react';\n\nexport const AuthContext = createContext(null);\n\nexport const AuthProvider = ({ children }) => {\n  const [user, setUser] = useState(null);\n  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;\n};`,
  'src/hooks/useAuth.js': `import { useContext } from 'react';\nimport { AuthContext } from '../context/AuthContext';\n\nexport const useAuth = () => useContext(AuthContext);`,
  'src/hooks/useFetch.js': `import { useState, useEffect } from 'react';\n\nexport function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  \n  // Dummy fetch implementation\n  useEffect(() => {\n    setLoading(false);\n  }, [url]);\n  \n  return { data, loading };\n}`,
  'src/pages/Feed.jsx': `export default function Feed() {\n  return <div className="p-8"><h1 className="text-2xl font-bold mb-4">Feed</h1></div>;\n}`,
  'src/pages/Login.jsx': `export default function Login() {\n  return <div className="p-8"><h1 className="text-2xl font-bold mb-4">Login</h1></div>;\n}`,
  'src/pages/Signup.jsx': `export default function Signup() {\n  return <div className="p-8"><h1 className="text-2xl font-bold mb-4">Signup</h1></div>;\n}`,
  'src/pages/Profile.jsx': `export default function Profile() {\n  return <div className="p-8"><h1 className="text-2xl font-bold mb-4">Profile</h1></div>;\n}`,
  'src/pages/CreatePost.jsx': `export default function CreatePost() {\n  return <div className="p-8"><h1 className="text-2xl font-bold mb-4">Create Post</h1></div>;\n}`,
  'src/pages/Connections.jsx': `export default function Connections() {\n  return <div className="p-8"><h1 className="text-2xl font-bold mb-4">Connections</h1></div>;\n}`,
  'src/pages/Chat.jsx': `export default function Chat() {\n  return <div className="p-8"><h1 className="text-2xl font-bold mb-4">Chat</h1></div>;\n}`,
  'src/routes/AppRoutes.jsx': `import { Routes, Route } from 'react-router-dom';\nimport Feed from '../pages/Feed';\nimport Login from '../pages/Login';\nimport Signup from '../pages/Signup';\nimport Chat from '../pages/Chat';\n\nexport default function AppRoutes() {\n  return (\n    <Routes>\n      <Route path="/" element={<Feed />} />\n      <Route path="/login" element={<Login />} />\n      <Route path="/signup" element={<Signup />} />\n      <Route path="/chat" element={<Chat />} />\n    </Routes>\n  );\n}`,
  'src/routes/ProtectedRoute.jsx': `import { Navigate } from 'react-router-dom';\nimport { useAuth } from '../hooks/useAuth';\n\nexport default function ProtectedRoute({ children }) {\n  const { user } = useAuth() || {};\n  if (!user) return <Navigate to="/login" />;\n  return children;\n}`,
  'src/services/authService.js': `import api from '../config/axiosConfig';\n\nexport const login = (data) => api.post('/auth/login', data);\nexport const signup = (data) => api.post('/auth/signup', data);`,
  'src/services/postService.js': `import api from '../config/axiosConfig';\n\nexport const getPosts = () => api.get('/posts');`,
  'src/services/userService.js': `import api from '../config/axiosConfig';\n\nexport const getUserProfile = (id) => api.get(\`/users/\${id}\`);`,
  'src/services/chatService.js': `import api from '../config/axiosConfig';\n\nexport const getMessages = (chatId) => api.get(\`/chat/\${chatId}\`);`,
  'src/utils/formatDate.js': `export const formatDate = (date) => {\n  return new Intl.DateTimeFormat('en-US').format(new Date(date));\n};`,
  'src/utils/validators.js': `export const validateEmail = (email) => {\n  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);\n};`,
  'src/App.jsx': `import { BrowserRouter } from 'react-router-dom';\nimport AppRoutes from './routes/AppRoutes';\nimport Navbar from './components/layout/Navbar';\nimport Footer from './components/layout/Footer';\nimport { AuthProvider } from './context/AuthContext';\n\nexport default function App() {\n  return (\n    <AuthProvider>\n      <BrowserRouter>\n        <div className="flex flex-col min-h-screen">\n          <Navbar />\n          <main className="flex-grow">\n            <AppRoutes />\n          </main>\n          <Footer />\n        </div>\n      </BrowserRouter>\n    </AuthProvider>\n  );\n}`,
  'src/main.jsx': `import { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App.jsx';\nimport './assets/index.css';\n\ncreateRoot(document.getElementById('root')).render(\n  <StrictMode>\n    <App />\n  </StrictMode>,\n);`
};

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(__dirname, file), content);
}
console.log('Scaffolding complete.');
