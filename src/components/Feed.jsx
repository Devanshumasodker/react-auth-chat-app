const Feed = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Feed</h2>
      {/* Dummy content for now */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 bg-white dark:bg-gray-700 rounded shadow">
            <p className="text-gray-700 dark:text-gray-200">Post #{i + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
