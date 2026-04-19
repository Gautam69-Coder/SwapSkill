import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import * as postService from '../services/postService';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function CreatePost() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    skillHave: '',
    skillWant: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    await postService.createPost({
      author: user.name,
      authorId: user.id,
      ...formData
    });
    
    setLoading(false);
    navigate('/feed');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow-sm bg-white">
      <h2 className="text-2xl font-bold mb-6">Create a Skill Swap Post</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Skill you have to offer:</label>
          <Input 
            required
            type="text" 
            placeholder="e.g., JavaScript" 
            value={formData.skillHave}
            onChange={(e) => setFormData({...formData, skillHave: e.target.value})}
            className="w-full border p-2 rounded"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Skill you want to learn:</label>
          <Input 
            required
            type="text" 
            placeholder="e.g., Spanish Language" 
            value={formData.skillWant}
            onChange={(e) => setFormData({...formData, skillWant: e.target.value})}
            className="w-full border p-2 rounded"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Description:</label>
          <textarea 
            required
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            rows="4"
            placeholder="Explain what you are looking for..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>
        
        <div className="mt-2">
          <Button type="submit" disabled={loading}>
            {loading ? 'Posting...' : 'Publish Post'}
          </Button>
        </div>
      </form>
    </div>
  );
}