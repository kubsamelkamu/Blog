import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { getPosts } from "../contexts/services/PostService";
import { useTheme } from "../contexts/useTheme";

function Blog() {
  const { theme} = useTheme(); 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getPosts(page); 
        setPosts((prevPosts) => {
          const newPosts = fetchedPosts.filter(
            (newPost) => !prevPosts.some((post) => post.id === newPost.id)
          );
          return [...prevPosts, ...newPosts];
        });

        setHasMore(fetchedPosts.length > 0);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]); 

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight || loading
      ) {
        return;
      }

      if (hasMore) {
        setPage((prevPage) => prevPage + 1); 
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className={`blog-page px-6 py-10 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <ClipLoader />
        </div>
      )}
      {error && (
        <p className="text-red-500 text-center">Failed to load posts. Please try again later.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            className={`post-card border rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 duration-300 ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
            }`}
            key={post.id}
          >
            <h3 className={`text-2xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              {post.title}
            </h3>
            <p className={`mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              {post.excerpt
                ? stripHtmlTags(post.excerpt)
                : post.content
                ? stripHtmlTags(post.content).slice(0, 100) + "..."
                : "No description available."}
            </p>
            <small className={`block mt-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              By {post.author.displayName} on{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </small>
            <p className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              {post.commentsCount} Comments, {post.likes} Likes
            </p>
            <button
              className={`mt-6 px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 ${
                theme === "dark" ? "bg-blue-500 text-white" : "bg-blue-500 text-white"
              }`}
              onClick={() => console.log("Read More")}
            >
              Read More
            </button>
          </div>
        ))}
      </div>
      {loading && <div className="flex justify-center items-center py-10"><ClipLoader /></div>}
      {!hasMore && !loading && <p className="text-center text-gray-500">No more posts to load.</p>}
    </div>
  );
}

export default Blog;
