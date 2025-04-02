import './globals.css';
import Header from './components/Header';

export const metadata = {
  title: 'Social Media Analytics',
  description: 'Real-time analytics from social media platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#dfcec6] min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
