export default function PostCard({ post }) {
    // Format date to be more readable
    const formattedDate = new Date(post.timestamp).toLocaleString();
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          {post.commentCount !== undefined && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
            </span>
          )}
        </div>
        <p className="text-gray-700 mb-4">{post.content}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>By {post.userName}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    );
  }
  