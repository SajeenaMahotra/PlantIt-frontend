import React from "react";
import { useNavigate } from "react-router-dom"; // Add navigate for routing
import "./home.css";

const Home = ({ isLoggedIn, setShowSignup }) => {
  const navigate = useNavigate();

  const handleBoxClick = (path) => {
    if (isLoggedIn) {
      navigate(path); // Navigate to the respective page if logged in
    } else {
      setShowSignup(true); // Show Signup modal if not logged in
    }
  };

  return (
    <div className="home">
      <div className="box-container">
        <div className="box" onClick={() => handleBoxClick("/learn")}>
          <img src="/src/assets/plantcare.png" alt="Plant Care" className="box-image" />
          <div className="box-overlay">Planting Guides</div>
        </div>
        <div className="box" >
          <img src="/src/assets/image2.jpg" alt="Plant Of the Month" className="box-image" />
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
