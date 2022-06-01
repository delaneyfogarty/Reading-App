import React, { useState } from 'react';
import { createProfile } from './services/supabase';
import UpdateProfilePage from './UpdateProfilePage';

export default function ProfilePage() {
  const [formName, setFormName] = useState('');
  const [avatar, setAvatar] = useState('🐌');

  async function handleCreateProfile(e) {
    e.preventDefault();
    await createProfile({
      name: formName,
      avatar: avatar,
    });
    setFormName('');
    setAvatar('');
  }

  return (
    <div>
      <form onSubmit={handleCreateProfile}>
        <label>
          Name:
          <input value={formName} onChange={(e) => setFormName(e.target.value)} />
        </label>
        <label>
          Pick Your Emoji
          <select onChange={(e) => setAvatar(e.target.value)}>
            <option>🐌</option>
            <option>🧞</option>
            <option>🧝‍♂️</option>
            <option>🧚</option>
            <option>🦖</option>
          </select>
        </label>
        <button>Submit Profile</button>
        <div>
          <p>{avatar}</p>
          <p>{formName}</p>
        </div>
      </form>
      {<UpdateProfilePage formName={formName} avatar={avatar} />}
    </div>
  );
}
