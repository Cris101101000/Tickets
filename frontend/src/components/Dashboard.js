import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
        const { data } = await axios.get('http://localhost:5000/api/auth/me', config);
        setUser(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchUser();

    // Cleanup function to avoid memory leaks
    return () => {
      setUser(null);
      setError(null);
    };
  }, []); // Empty array ensures this runs only once

  if (error) {
    return <div>Error fetching user data: {error.message}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Dashboard;
