// src/components/DataForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/AuthContext';

const DataForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/data', { name, country: user.country });
      navigate('/data');
    } catch (error) {
      console.error('Error creating data', error);
    }
  };

  if (user.role !== 'Admin') {
    return <p>Access Denied</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Data for {user.country}</h3>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default DataForm;
