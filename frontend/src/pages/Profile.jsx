import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import * as userService from '../services/userService';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    skillsHave: '',
    skillsWant: '',
    skillLevel: 'Beginner',
  });

  useEffect(() => {
    if (user) {
      userService.getUserProfile(user.id).then((res) => {
        setProfile(res.data);
        setFormData(res.data);
        setLoading(false);
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await userService.updateUserProfile(user.id, formData);
    setProfile(res.data);
    setIsEditing(false);
    setLoading(false);
  };

  if (loading || !profile) {
    return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow-sm bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Profile</h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </div>

      <div className="mb-6 bg-gray-50 p-4 rounded border">
        <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Account Info</p>
        <p className="text-lg mt-2"><span className="font-medium">Name:</span> {user?.name}</p>
        <p className="text-lg mt-1"><span className="font-medium">Email:</span> {user?.email}</p>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="flex flex-col gap-4 border-t pt-6">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Skills you have:</label>
            <Input 
              type="text" 
              className="w-full border p-2 rounded"
              placeholder="e.g., React, Python, Graphic Design" 
              value={formData.skillsHave} 
              onChange={(e) => setFormData({ ...formData, skillsHave: e.target.value })} 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Skills you want to learn:</label>
            <Input 
              type="text" 
              className="w-full border p-2 rounded"
              placeholder="e.g., Node.js, UI/UX, Public Speaking" 
              value={formData.skillsWant} 
              onChange={(e) => setFormData({ ...formData, skillsWant: e.target.value })} 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Skill Level:</label>
            <select 
              className="w-full border p-2 rounded bg-white"
              value={formData.skillLevel} 
              onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value })}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          
          <div className="flex gap-4 mt-4">
            <Button type="submit">Save Changes</Button>
            <button 
              type="button" 
              onClick={() => {
                setIsEditing(false);
                setFormData(profile); // Revert unsaved changes
              }} 
              className="text-gray-600 hover:text-gray-800 px-4 py-2 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="border-t pt-6 flex flex-col gap-4">
          <div>
            <p className="text-gray-600 font-semibold">Skills you have:</p>
            <p className="text-lg">{profile.skillsHave || <span className="text-gray-400 italic text-sm">Not specified</span>}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Skills you want to learn:</p>
            <p className="text-lg">{profile.skillsWant || <span className="text-gray-400 italic text-sm">Not specified</span>}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Skill Level:</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium mt-1">
              {profile.skillLevel}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}