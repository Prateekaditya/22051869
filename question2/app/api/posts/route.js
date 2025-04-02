import { getUsers, getUserPosts, getPostComments } from '@/lib/api';
import { userCache, postCache, commentCache } from '@/lib/cache';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'popular';
    
    if (type !== 'popular' && type !== 'latest') {
      return NextResponse.json(
        { error: 'Invalid type parameter. Use "popular" or "latest"' }, 
        { status: 400 }
      );
    }
    
    // Check cache first
    const cacheKey = `posts_${type}`;
    const cachedPosts = postCache.get(cacheKey);
    if (cachedPosts) {
      return NextResponse.json(cachedPosts);
    }
    
    // Fetch all users
    const usersData = await getUsers();
    const users = usersData.users || {};
    
    // Collect all posts
    let allPosts = [];
    
    for (const [userId, userName] of Object.entries(users)) {
      // Check cache for user posts
      const userPostsCacheKey = `userPosts_${userId}`;
      let userPosts = postCache.get(userPostsCacheKey);
      
      if (!userPosts) {
        const postsData = await getUserPosts(userId);
        userPosts = postsData.posts || [];
        postCache.set(userPostsCacheKey, userPosts);
      }
      
      // Add user info to posts
      const postsWithUserInfo = userPosts.map(post => ({
        ...post,
        userId,
        userName
      }));
      
      allPosts = [...allPosts, ...postsWithUserInfo];
    }
    
    let result;
    
    if (type === 'popular') {
      // For each post, get comment count
      for (let i = 0; i < allPosts.length; i++) {
        const post = allPosts[i];
        const commentsCacheKey = `postComments_${post.id}`;
        let comments = commentCache.get(commentsCacheKey);
        
        if (!comments) {
          const commentsData = await getPostComments(post.id);
          comments = commentsData.comments || [];
          commentCache.set(commentsCacheKey, comments);
        }
        
        allPosts[i].commentCount = comments.length;
      }
      
      // Find the maximum comment count
      const maxCommentCount = Math.max(...allPosts.map(post => post.commentCount));
      
      // Get all posts with the maximum comment count
      result = allPosts.filter(post => post.commentCount === maxCommentCount);
    } else if (type === 'latest') {
      // Sort by timestamp in descending order
      allPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      // Get latest 5 posts
      result = allPosts.slice(0, 5);
    }
    
    // Cache the result
    postCache.set(cacheKey, result);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error(`Error fetching posts:`, error);
    // Use a default value for type in the error message
    const requestType = request.url.includes('type=latest') ? 'latest' : 'popular';
    return NextResponse.json({ error: `Error fetching ${requestType} posts: ${error.message}` }, { status: 500 });
  }
}
