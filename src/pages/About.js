import React from 'react';
import '../styles/About.css'; // Ensure the correct path to your CSS file

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Mission Statement</h1>
      </div>
      
      <div className="about-paragraph">
        <p>
          Our mission is to bring the game of chess to underfunded communities, providing educational 
          opportunities and developing critical thinking, strategy, and patience through this timeless game. 
          By offering various challenges, we aim to empower individuals and promote positive change, one move at a time.
        </p>
      </div>
    </div>
  );
};

export default About;
