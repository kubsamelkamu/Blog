import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { getPosts } from "../contexts/services/PostService";

function Blog() {
    const[posts,setPosts] = useState([]);
    const[loading,setLoading] = useState(true);
    const[error,setError] = useState(null);

    useEffect(()=>{
        const fetchPosts = async()=>{
            try {
                const fetchedposts =await getPosts();
                setPosts(fetchedposts);
            } catch (error) {
                setError(error);
            }finally{
                setLoading(false);
            }
        }

        fetchPosts();
    },[]);

    return (
        <div className="blog-page">
          {/* Loading state */}
          {loading && <ClipLoader />}
    
          {/* Error state */}
          {error && <p>Failed to load posts. Please try again later.</p>}
    
          {/* Post list */}
          {!loading && posts.length > 0 ? (
            posts.map((post) => (
              <div className="post-card" key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <small>By {post.author.displayName} on {new Date(post.createdAt).toLocaleDateString()}</small>
                <p>{post.commentsCount} Comments, {post.likes} Likes</p>
                <button>Read More</button>
              </div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      );
}

export default Blog;