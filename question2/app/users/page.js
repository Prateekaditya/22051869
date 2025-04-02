'use client';

import { useState, useEffect } from 'react';
import UserCard from '../components/UserCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function TopUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch top users: ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching top users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
    
    // Set up polling to refresh data every 30 seconds
    const intervalId = setInterval(fetchTopUsers, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Top Users</h1>
      
      {error && <ErrorMessage message={error} />}
      
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          {users.length > 0 ? (
            users.map((user, index) => (
              <UserCard key={user.id} user={user} rank={index + 1} />
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No users found.</p>
          )}
        </div>
      )}
    </div>
  );
}
