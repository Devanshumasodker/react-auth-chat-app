import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetPostsQuery } from '../utils/authApi';
import ChatSidebar from '../components/ChatSidebar';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const limit = 10;

  const { data, isLoading, isError } = useGetPostsQuery({ limit, skip });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) navigate('/');
    else setUser(JSON.parse(userData));
    
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 text-gray-800 dark:text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-teal-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Enhanced Navbar */}
      <nav className={`backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-b border-white/20 dark:border-gray-700/50 sticky top-0 z-40 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-2 sm:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                🧠
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                React Auth Chat App
              </h1>
            </div>
            
            {user && (
              <div className="flex items-center space-x-4">
                <div className="text-center sm:text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back,</p>
                  <p className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {user.username}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={`relative z-10 text-center py-12 px-6 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Discover Amazing Content
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore the latest posts and connect with your community through our interactive feed
        </p>
      </div>

      {/* Feed Section */}
      <main className={`relative z-10 px-4 sm:px-6 lg:px-12 pb-6 max-w-7xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              📢
            </div>
            <h2 className="text-2xl font-bold">Latest Feed</h2>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live Updates</span>
          </div>
        </div>

        {isError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
              <span className="text-lg">❌</span>
              <span className="font-medium">Failed to load posts. Please try again later.</span>
            </div>
          </div>
        )}

        {isLoading && posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading content...</p>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="ml-2 text-sm font-medium">Loading more posts...</span>
                </div>
              </div>
            }
            scrollThreshold={0.9}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 hover:-translate-y-1 border border-white/50 dark:border-gray-700/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg transition-transform duration-200 hover:scale-105">
                      {post.title.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
                    {post.body}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Post #{post.id}</span>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <button className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                        ❤️
                      </button>
                      <button className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                        💬
                      </button>
                      <button className="text-gray-400 hover:text-green-500 transition-colors duration-200">
                        📤
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </main>

      <button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-2xl shadow-xl z-50 transition-all duration-200 hover:scale-105"
        onClick={() => setIsChatOpen((prev) => !prev)}
        aria-label="Toggle Chat"
      >
        <div className="relative">
          <span className="text-xl transition-transform duration-150 block">
            {isChatOpen ? '✕' : '💬'}
          </span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </button>


      <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default HomePage;