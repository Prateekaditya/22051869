import { useEffect, useState } from "react";
const userImages = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
];

export default function UserCard({ user, rank }) {
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * userImages.length);
    setRandomImage(userImages[randomIndex]);
  }, []);

  return (
    <div className="bg-[#2d1f16]  rounded-lg shadow-md p-6 hover:scale-105 duration-300">
      <div className="flex items-center gap-5">
      <div className="bg-white text-[#2d1f16] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-2">
            {rank}
          </div>
        <img 
          src={randomImage} 
          alt={`${user.name}'s avatar`} 
          className="w-18 h-18 rounded-full mr-5"
        />
        <div className="flex flex-col gap-1.5">
          
          <h3 className="text-xl font-semibold text-[#dfcec6]">{user.name}</h3>
          <p className="text-[#dfcec6]">User ID: {user.id}</p>
          <div className="mt-2">
            <span className="bg-white text-[#2d1f16] px-3 py-1 rounded-full text-sm font-medium">
              {user.postCount} {user.postCount === 1 ? 'post' : 'posts'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
