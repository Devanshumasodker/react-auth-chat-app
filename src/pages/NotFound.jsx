import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center text-gray-800 dark:text-white">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg">Page not found.</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go back to login
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
