import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black text-[#dfcec6] font-bold shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Social Media Analytics</h1>
          <nav className="space-x-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/users" className="hover:underline">
              Top Users
            </Link>
            <Link href="/posts?type=popular" className="hover:underline">
              Popular Posts
            </Link>
            <Link href="/posts?type=latest" className="hover:underline">
              Latest Posts
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
