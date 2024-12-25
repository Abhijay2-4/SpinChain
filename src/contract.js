import Web3 from 'web3';
import RouletteGameABI from './RouletteGameABI.json'; // The ABI of the RouletteGame contract

// Initialize web3 instance and contract
const web3 = new Web3(window.ethereum);

const contractAddress = '0x5b5D8AEB269E952cA9e57Ae1fDb88fFa46FA94Ba'; // Replace with your contract address
const contract = new web3.eth.Contract(RouletteGameABI, contractAddress);

export const getAccounts = async () => {
  const accounts = await web3.eth.requestAccounts();
  return accounts;
};

export const depositFunds = async (amount) => {
  const accounts = await getAccounts();
  await contract.methods.deposit().send({
    from: accounts[0],
    value: web3.utils.toWei(amount, 'ether'), // Convert amount to Wei
  });
};

export const rewardUser = async (winnerAddress, coinsAmount) => {
  const accounts = await getAccounts();
  await contract.methods.rewardUser(winnerAddress, web3.utils.toWei(coinsAmount.toString(), 'ether')).send({ from: accounts[0] });
};

export const getContractBalance = async () => {
  const balance = await contract.methods.getContractBalance().call();
  return web3.utils.fromWei(balance, 'ether');
};
