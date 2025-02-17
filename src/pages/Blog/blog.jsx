import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../../components/BlogCard/blogcard";
import "./blog.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blogs/published"); // Adjust the URL if necessary
        console.log(response.data); 
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-page">
      <div className="slogan">
      🌿 Welcome to the PlantIt Blog – your space for all things green! Whether you're a gardening enthusiast, a plant parent, or just love nature, our blog brings you expert tips, DIY ideas, and inspiring plant stories to nurture your passion for greenery 🌱
    </div>
      <div className="blog-container">
        {blogs.length > 0 ? (
          <div className="blog-grid">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}  // Pass the id to the BlogCard
                image={blog.imageUrl}
                title={blog.title}
                description={blog.description}
                date={new Date(blog.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              />
            ))}
          </div>
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
