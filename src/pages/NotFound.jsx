import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="text-center mt-20">
          <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
          <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
          <Link to="/" className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700">
            Go Home
          </Link>
        </div>
      );
};

export default NotFound;