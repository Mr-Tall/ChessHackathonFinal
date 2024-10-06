import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // Ensure this path is correct

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>
          <div className="Tackling Chess Easy: ">
            <span className="key">T</span>
            <span className="key">a</span>
            <span className="key">c</span>
            <span className="key">k</span>
            <span className="key">l</span>
            <span className="key">i</span>
            <span className="key">n</span>
            <span className="key">g</span>
            <span className="key space"> </span>
            <span className="key">C</span>
            <span className="key">h</span>
            <span className="key">e</span>
            <span className="key">s</span>
            <span className="key">s</span>
            <span className="key space"> </span>
            <span className="key">E</span>
            <span className="key">a</span>
            <span className="key">s</span>
            <span className="key">y</span>
            <span className="key space"> </span>
            <span className="key">:</span>
          </div>
          <span> With Checkmate for Change</span>
        </h1>
        <p>Teaching chess to underfunded communities through engaging lessons.</p>
      </div>
      <div className="button-group">
        <Link to="/About"><button className="btn btn-about">About</button></Link>
        <Link to="/Beginner"><button className="btn btn-beginner">Beginner</button></Link>
        <Link to="/Intermediate"><button className="btn btn-intermediate">Intermediate</button></Link>
        <Link to="/Advanced"><button className="btn btn-advanced">Advanced</button></Link>
      </div>
    </div>
  );
};

export default Home;
