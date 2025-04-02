'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function Posts() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'popular';
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/posts?type=${type}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${type} posts: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(`Error fetching ${type} posts:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    
    // Set up polling to refresh data
    // Use different intervals based on post type
    const interval = type === 'latest' ? 15000 : 30000; // 15s for latest, 30s for popular
    const intervalId = setInterval(fetchPosts, interval);
    
    // Clean up interval on component unmount or when type changes
    return () => clearInterval(intervalId);
  }, [type]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {type === 'popular' ? 'Popular Posts' : 'Latest Posts'}
        </h1>
        
        <div className="flex space-x-4">
          <Link 
            href="/posts?type=popular" 
            className={`px-4 py-2 rounded-md ${
              type === 'popular' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Popular
          </Link>
          <Link 
            href="/posts?type=latest" 
            className={`px-4 py-2 rounded-md ${
              type === 'latest' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Latest
          </Link>
        </div>
      </div>
      
      {error && <ErrorMessage message={error} />}
      
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No posts found.</p>
          )}
        </div>
      )}
    </div>
  );
}
