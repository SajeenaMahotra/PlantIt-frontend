import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import "./blogdetail.css"; 

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  const sanitizedContent = DOMPurify.sanitize(blog.content, {
    ALLOWED_TAGS: ['strong', 'em', 'u', 'ol', 'li', 'p', 'br', 'span'], 
  });

  return (
    <div className="blog-detail-container">
      <div className="category-box">
        <h3>{blog.category}</h3> 
      </div>

      <h1 className="blog-title">{blog.title}</h1>

      <p className="author-date">
      <span>By PlantIt · {new Date(blog.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
      &nbsp;&nbsp;•&nbsp;&nbsp; 
      <span>Updated at: {new Date(blog.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
      </p>

      {blog.imageUrl && (
        <div className="blog-image">
          <img src={blog.imageUrl} alt={blog.title} />
        </div>
      )}

      <p className="blog-description">{blog.description}</p>

      <div className="blog-content">
        
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </div>

      <div className="blog-tags">
        {blog.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
