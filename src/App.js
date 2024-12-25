import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import AboutImg from './assets/about.jpg'

const App = () => {
  const navigate = useNavigate();

  const handlePlayNowClick = () => {
    navigate('/wheel'); // Navigate to WheelComponent
  };

  return (
    <>
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to the Roulette Wheel Game</h1>
          <p className="hero-description">
            Spin the wheel, win prizes, and enjoy the thrill! Try your luck now and collect rewards directly on-chain.
          </p>
          <button className="hero-button" onClick={handlePlayNowClick}>
            Play Now
          </button>
        </div>
      </div>

      <div className="about-section">
  <div className="about-content">
    <div className="about-text">
      <h2 className="section-title">About Us</h2>
      <p className="section-description">
        At SpinChain, we bring the excitement of spinning a roulette wheel directly to your browser. 
        Our platform is powered by blockchain technology, ensuring fairness, transparency, and secure 
        rewards for every spin.
      </p>
    </div>
    <div className="about-image">
      <img 
        src={AboutImg} 
        alt="About Us" 
        className="about-img"
      />
    </div>
  </div>
</div>


      <div className="features-section">
  <center><h2 className="feature-section-title">Features</h2></center>
  <div className="features-cards">
    <div className="card">
      <h3 className="card-title">Transparent Rewards</h3>
      <p className="card-description">
        Blockchain-backed fairness ensures every spin is transparent and secure.
      </p>
    </div>
    <div className="card">
      <h3 className="card-title">Engaging Gameplay</h3>
      <p className="card-description">
        Enjoy a fun, interactive, and exciting gameplay experience with each spin.
      </p>
    </div>
    <div className="card">
      <h3 className="card-title">Win Big</h3>
      <p className="card-description">
        Stand a chance to win up to 5 ETH in rewards for your spins.
      </p>
    </div>
  </div>
</div>

    </>
  );
};

export default App;
