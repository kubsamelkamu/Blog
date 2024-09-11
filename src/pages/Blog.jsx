import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { getPosts } from "../contexts/services/PostService";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedposts = await getPosts();
        setPosts(fetchedposts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className="blog-page px-6 py-10">
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <ClipLoader />
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center">Failed to load posts. Please try again later.</p>
      )}

      {!loading && posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              className="post-card border border-gray-300 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 duration-300"
              key={post.id}
            >
              <h3 className="text-2xl font-semibold text-gray-800">{post.title}</h3>
              <p className="text-gray-600 mt-2">
                {post.excerpt
                  ? stripHtmlTags(post.excerpt)
                  : post.content
                  ? stripHtmlTags(post.content).slice(0, 100) + "..."
                  : "No description available."}
              </p>
              <small className="block mt-4 text-gray-500">
                By {post.author.displayName} on{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </small>
              <p className="text-gray-500 mt-2">
                {post.commentsCount} Comments, {post.likes} Likes
              </p>
              <button
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                onClick={() => console.log("Read More")}
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-500">No posts found.</p>
      )}
    </div>
  );
}

export default Blog;
