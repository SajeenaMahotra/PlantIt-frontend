import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axiosInstance from "../../api/axios";
import "./home.css";

const Home = ({ isLoggedIn, setShowSignup }) => {
  const navigate = useNavigate();
  const [plantImage, setPlantImage] = useState(""); 

  const handleBoxClick = (path) => {
    if (isLoggedIn) {
      navigate(path); // Navigate to the respective page if logged in
    } else {
      setShowSignup(true); // Show Signup modal if not logged in
    }
  };

  useEffect(() => {
    const fetchPlantOfTheMonth = async () => {
      try {
        const response = await axiosInstance.get("/potm/plantofthemonth");
        if (response.data && response.data.imageUrl) {
          setPlantImage(response.data.imageUrl); // Store image URL
        }
      } catch (error) {
        console.error("Error fetching Plant of the Month:", error);
      }
    };

    fetchPlantOfTheMonth();
  }, []);

  return (
    <div className="home">
      <div className="box-container">
        <div className="box" onClick={() => handleBoxClick("/search")}>
          <img src="/src/assets/plantcare.png" alt="Plant Care" className="box-image" />
          <div className="box-overlay">Browse Plants</div>
        </div>
        <div className="box"  onClick={() => navigate("/plantofthemonth")}>
        <img 
            src={plantImage || "/src/assets/default-plant.jpg"} 
            alt="Plant Of the Month" 
            className="box-image" 
          />
          <div className="box-overlay">Plant of the Month</div>
        </div>
        <div className="box" onClick={() => handleBoxClick("/blog")}>
          <img src="/src/assets/gardening.png" alt="Gardening Guides" className="box-image" />
          <div className="box-overlay">Gardening Blog</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
