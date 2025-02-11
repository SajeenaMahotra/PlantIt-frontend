import React from "react";
import "./home.css";


const Home = ({ setShowSignup }) => {

  const handleSignupTrigger = () => {
    setShowSignup(true); // ✅ Open Signup modal when clicked
  };

  return (
    <div className="home">
      <div className="box-container">
        <div className="box"  onClick={handleSignupTrigger}>
          <img src="/src/assets/plantcare.png" alt="Plant Care" className="box-image" />
          <div className="box-overlay">Planting Guides</div>
        </div>
        <div className="box">
          <img src="/src/assets/image2.jpg" alt="Plant Of the Month" className="box-image" />
          <div className="box-overlay">Plant of the Month</div>
        </div>
        <div className="box"  onClick={handleSignupTrigger}>
          <img src="/src/assets/gardening.png" alt="Gardening Guides" className="box-image" />
          <div className="box-overlay">Gardening Blog</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
