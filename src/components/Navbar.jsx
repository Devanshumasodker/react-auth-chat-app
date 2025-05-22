const Navbar = () => {
  const username = "john_doe"; // replace with dynamic later

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">Home</h1>
      <span className="text-gray-600 dark:text-gray-300">@{username}</span>
    </nav>
  );
};

export default Navbar;
