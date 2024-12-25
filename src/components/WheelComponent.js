import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { rewardUser } from "../contract";

const data = [
  { option: "0 GAS" },
  { option: "0.1 GAS" },
  { option: "0.2 GAS" },
  { option: "0.3 GAS" },
  { option: "0.4 GAS" },
  { option: "0 GAS" },
  { option: "0 GAS" },
  { option: "0.1 GAS" },
  { option: "0.2 GAS" },
  { option: "0.3 GAS" },
  { option: "0.4 GAS" },
  { option: "0 GAS" },
];

const WheelComponent = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [coins, setCoins] = useState(0);
  const [isRewardCollected, setIsRewardCollected] = useState(false);

  // Handle Spin Click
  const handleSpinClick = async () => {
    if (mustSpin) return; // Prevent spin if already spinning

    // Start spinning the wheel
    setMustSpin(true);

    // Set a random prize number after the wheel starts spinning
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
  };

  // Handle when the spinning stops
  const handleStopSpinning = () => {
    // Reward calculation logic based on prizeNumber
    let prizeAmount = 0;
    switch (data[prizeNumber].option) {
      case "0 GAS":
        prizeAmount = 0;
        break;
      case "0.1 GAS":
        prizeAmount = 0.1;
        break;
      case "0.2 GAS":
        prizeAmount = 0.2;
        break;
      case "0.3 GAS":
        prizeAmount = 0.3;
        break;
      case "0.4 GAS":
        prizeAmount = 0.4;
        break;
      default:
        prizeAmount = 0;
    }
    setCoins(prizeAmount); // Update prize amount
    setMustSpin(false); // Stop the spinning animation
  };

  // Handle Collect Reward
  const handleCollectReward = async () => {
    if (coins > 0) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await rewardUser(accounts[0], coins); // Reward the user based on the coins won
      setIsRewardCollected(true); // Indicate that reward has been collected
    } else {
      alert("No prize to collect!");
    }
  };

  return (
    <>
      <div className="game-container">
        <h1 className="game-title">Roulette Wheel</h1>
        <div className="wheel-container">
        <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={handleStopSpinning}
            backgroundColors={['#ffcc00', '#ff9900', '#ff5722', '#e64a19']}
            textColors={['#ffffff']}
            outerBorderColor="#ff5722"
            outerBorderWidth={10}
            innerBorderColor="#000000"
            innerBorderWidth={5}
            innerRadius={10}
            radiusLineColor="#ffffff"
            radiusLineWidth={5}
            radius={400}
          />
          <button className="spin-button" onClick={handleSpinClick}>
            SPIN
          </button>
        </div>
        {coins > 0 && <p className="win-message">🎉 You won {coins} GAS! 🎉</p>}
        <button
          className="reward-button"
          onClick={handleCollectReward}
          disabled={isRewardCollected}
        >
          {isRewardCollected ? "Reward Collected" : "Collect Reward"}
        </button>
        
      </div>
    </>
  );
};

export default WheelComponent;
