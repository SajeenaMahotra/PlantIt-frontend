import React from 'react';
import './about.css';
import Footer from "../../components/Footer/footer"; 

const About = () => {
  return (
    <>
    <div id="about-section" className="about-container">
      <div className="about-content">
      <div className="about-image">
          <img src="/src/assets/about.png" alt="About PlantIt" />
        </div>
        <div className="about-text">
          <h2>Welcome to PlantIt</h2>
          <h3>Let's talk plants, shall we?</h3>
          <p>
            Gardening made simple and fun. Whether you're nurturing a thriving garden, 
            starting with your first potted herb, or just trying to keep that mystery 
            plant alive, we've got you covered.
          </p>
          <p>
            Explore ideas, find expert tips, and organize your green dreams with PlantIt—your 
            companion for indoor hacks, outdoor makeovers, and everything in between.
          </p>
          <p>
            You're here! Dig in, get inspired, and let your green thumb grow. 🌿
          </p>
        </div>
      </div>
      </div>
    <Footer />
    </>
  );
};

export default About;
