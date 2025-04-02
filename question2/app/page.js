import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Social Media Analytics Dashboard</h1>
      
      <p className="text-lg mb-8">
        Welcome to the Social Media Analytics Dashboard. This platform provides real-time insights 
        into social media activity, helping you understand user engagement and content performance.
      </p>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-[#dfcec6] rounded-lg shadow-2xl p-6 hover:shadow-[4px_4px_64px_33px_#f5d9cb]  transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Top Users</h2>
          <p className="mb-4">Discover the most active users on the platform based on post count.</p>
          <Link 
            href="/users" 
            className="inline-block bg-black text-white px-4 py-2 rounded hover:scale-105 duration-200"
          >
            View Top Users
          </Link>
        </div>
        
        <div className="bg-[#dfcec6] rounded-lg shadow-2xl p-6 hover:shadow-[4px_4px_64px_33px_#f5d9cb] transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Popular Posts</h2>
          <p className="mb-4">See the posts with the highest engagement based on comment count.</p>
          <Link 
            href="/posts?type=popular" 
            className="inline-block bg-black text-white px-4 py-2 rounded hover:scale-105 duration-200"
          >
            View Popular Posts
          </Link>
        </div>
        
        <div className="bg-[#dfcec6] rounded-lg shadow-2xl p-6 hover:shadow-[4px_4px_64px_33px_#f5d9cb]  transition-shadow duration-300 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
          <p className="mb-4">Stay updated with the most recent content from across the platform.</p>
          <Link 
            href="/posts?type=latest" 
            className="inline-block bg-black text-white px-4 py-2 rounded hover:scale-105 duration-200"
          >
            View Latest Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
