import React, { useState } from "react";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css"; // Import styles for ReactQuill
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addplantofthemonth.css";

const AddPlantOfTheMonth = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [procedure, setProcedure] = useState("");
  const [month, setMonth] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(""); // Store uploaded file name
  const [publishCode, setPublishCode] = useState("");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize the procedure content
    const sanitizedProcedure = DOMPurify.sanitize(procedure);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("procedure", sanitizedProcedure);
    formData.append("month", month);
    formData.append("image", imageFile);
    formData.append("publishCode", publishCode);

    try {
      const response = await axios.post(
        "http://localhost:5000/potm/plantofthemonth", // Ensure this URL is correct
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("Plant of the Month Published successfully")
      console.log("Plant of the Month created:", response.data);
      setTitle("");
      setDescription("");
      setContent("");
      setCategory("");
      setTags("");
      setImage(null);
      setImageFile(null);
    } catch (error) {
      alert("Error creating Plant of the Month:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);

      
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <div className="add-plant-of-the-month">
      <div className="add-plant-of-the-month-blog-container">
        <div className="add-plant-of-the-month-image-upload-box">
          {image ? (
            <img src={image} alt="Uploaded" className="add-plant-of-the-month-image-uploaded-image" />
          ) : (
            <label className="add-plant-of-the-month-image-upload-label">
              +
              <input type="file" accept=".jpeg,.jpg,.png" onChange={handleImageUpload} />
            </label>
          )}
          <p className="add-plant-of-the-month-image-message">
            We recommend using .jpeg, .jpg, or .png files less than 2MB.
          </p>
        </div>
        <div className="add-plant-of-the-month-image-blog-details">
          <input
            type="text"
            placeholder="Name of the Plant"
            className="add-plant-of-the-month-image-blog-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Summary"
            className="add-plant-of-the-month-image-blog-textarea"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <ReactQuill
            placeholder="Write the procedure here..."
            value={procedure}
            onChange={setProcedure}
            className="quill-editor"
          />
          <select
            className="add-plant-of-the-month-image-blog-input"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          >
            <option value="">Select a Month</option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {successMessage && <div className="success-message">{successMessage}</div>}

          <input
            type="password"
            className="add-plant-of-the-month-image-blog-input"
            value={publishCode}
            onChange={(e) => setPublishCode(e.target.value)}
            required
            placeholder="Enter publish code"
          />
          <button type="submit" className="add-plant-of-the-month-image-publish-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlantOfTheMonth;