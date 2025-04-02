import { getUsers, getUserPosts } from '@/lib/api';
import { userCache, postCache } from '@/lib/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check cache first
    const cachedTopUsers = userCache.get('topUsers');
    if (cachedTopUsers) {
      return NextResponse.json(cachedTopUsers);
    }

    // Fetch all users
    const usersData = await getUsers();
    const users = usersData.users || {};
    
    // Create an array to track post counts
    const userPostCounts = [];
    
    // Fetch posts for each user
    for (const [userId, userName] of Object.entries(users)) {
      // Check cache for user posts
      const cacheKey = `userPosts_${userId}`;
      let userPosts = postCache.get(cacheKey);
      
      if (!userPosts) {
        const postsData = await getUserPosts(userId);
        userPosts = postsData.posts || [];
        postCache.set(cacheKey, userPosts);
      }
      
      userPostCounts.push({
        id: userId,
        name: userName,
        postCount: userPosts.length
      });
    }
    
    // Sort by post count in descending order
    userPostCounts.sort((a, b) => b.postCount - a.postCount);
    
    // Get top 5 users
    const topUsers = userPostCounts.slice(0, 5);
    
    // Cache the result
    userCache.set('topUsers', topUsers);
    
    return NextResponse.json(topUsers);
  } catch (error) {
    console.error('Error fetching top users:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
