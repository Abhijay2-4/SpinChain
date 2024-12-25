// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RouletteGame {
    address public admin;
    uint256 public totalPrizePool;

    // Constructor to set the admin (deployer) and accept ETH at the time of deployment
    constructor() payable {
        admin = msg.sender;
        totalPrizePool = msg.value; // Set the prize pool to the initial ETH sent during deployment
    }

    // Function to withdraw ETH (only the admin can withdraw)
    function withdraw(uint256 amount) external {
        require(msg.sender == admin, "Only admin can withdraw");
        require(amount <= totalPrizePool, "Not enough funds in the contract");
        payable(admin).transfer(amount);
        totalPrizePool -= amount;
    }

    // Function to reward user based on the roulette result
    function rewardUser(address payable winner, uint256 amount) external {
        require(amount <= totalPrizePool, "Not enough funds in the contract");
        require(amount > 0 && amount <= 5 ether, "Invalid amount (max 5 ETH)");
        winner.transfer(amount); // Send ETH to the user
        totalPrizePool -= amount; // Decrease the prize pool
    }

    // Get the current balance of the contract
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
