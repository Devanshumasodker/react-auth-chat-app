// src/pages/HomePage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetPostsQuery } from '../utils/authApi';
import ChatSidebar from '../components/ChatSidebar'; // 👈 Make sure this path is correct

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false); // 👈 Chat state
  const limit = 10;

  const { data, isLoading, isError } = useGetPostsQuery({ limit, skip });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) navigate('/');
    else setUser(JSON.parse(userData));
  }, [navigate]);

  useEffect(() => {
    if (data?.posts?.length) {
      setPosts((prev) => [...prev, ...data.posts]);
    }
  }, [data]);

  const fetchMoreData = () => {
    if (!isLoading && data?.posts?.length === limit) {
      setSkip((prev) => prev + limit);
    }
  };

  const hasMore = data ? posts.length < data.total : true;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white relative">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow">
        <h1 className="text-xl font-bold">React Auth Chat App</h1>
        {user && (
          <span className="text-sm font-medium">
            Welcome, <span className="font-bold">{user.username}</span>
          </span>
        )}
      </nav>

      {/* Feed Section */}
      <main className="p-6">
        <h2 className="text-lg font-semibold mb-4">Feed</h2>

        {isError && <p className="text-red-500">Failed to load posts</p>}
        {isLoading && posts.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 className="text-center mt-4">Loading more...</h4>}
            scrollThreshold={0.9}
          >
            <div className="grid gap-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded shadow"
                >
                  <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                  <p>{post.body}</p>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </main>

      {/* Chat Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
        onClick={() => setIsChatOpen((prev) => !prev)}
      >
        💬
      </button>

      {/* Chat Sidebar */}
      <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default HomePage;
