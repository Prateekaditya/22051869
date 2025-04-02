import { useEffect, useState } from "react";

const postImages = [
   "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
];

export default function PostCard({ post }) {
  const [randomImage, setRandomImage] = useState("");
 
  
  useEffect(() => {
   
    const randomIndex = Math.floor(Math.random() * postImages.length);
    setRandomImage(postImages[randomIndex]);
    
   
  }, );
  

  return (
    <div className="bg-[#2d1f16] rounded-lg shadow-md p-6 hover:scale-105 duration-300 w-200">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        {post.commentCount !== undefined && (
          <span className="bg-[#dfcec6] text-[#2d1f16] px-3 py-1 rounded-full text-sm font-medium">
            {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
          </span>
        )}
      </div>
      <img 
        src={randomImage} 
        alt={`Post image for ${post.title}`} 
        className="w-25 h-40 object-cover rounded-md my-3"
      />
      <p className="text-[#dfcec6] mb-4">{post.content}</p>
      <div className="flex justify-between items-center text-sm text-[#dfcec6]">
        <span>By {post.userName}</span>
       
      </div>
    </div>
  );
}
