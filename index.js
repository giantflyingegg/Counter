//counter logic

let counter = 0;

document.getElementById("counter").innerHTML = counter;

document.getElementById("decrease").addEventListener("click", () => {
  counter--;
  document.getElementById("counter").innerHTML = counter;
});

document.getElementById("increase").addEventListener("click", () => {
  counter++;
  document.getElementById("counter").innerHTML = counter;
});

document.getElementById("reset").addEventListener("click", () => {
  counter = 0;
  document.getElementById("counter").innerHTML = counter;
});

const contractAddress = '0x214F0x214fff5a743c42775649d6513cb2b25578a3cb7b';
const contractABI = [
	{
		"inputs": [],
		"name": "decrease",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "increase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "counter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

window.addEventListener('load', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      console.log('Connected account:', accounts[0]);
      initApp();
    } catch (error) {
      console.error('User denied account access');
    }
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
});

function initApp() {
  const counterContract = new web3.eth.Contract(contractABI, contractAddress);

  counterContract.methods.getCounter().call().then((counter) => {
    document.getElementById("counter").innerHTML = counter;
  });

  document.getElementById("increase").addEventListener("click", () => {
    counterContract.methods.increase().send({from: ethereum.selectedAddress})
      .then(() => {
        return counterContract.methods.getCounter().call();
      })
      .then((counter) => {
        document.getElementById("counter").innerHTML = counter;
      });
  });

  document.getElementById("decrease").addEventListener("click", () => {
    counterContract.methods.decrease().send({from: ethereum.selectedAddress})
      .then(() => {
        return counterContract.methods.getCounter().call();
      })
      .then((counter) => {
        document.getElementById("counter").innerHTML = counter;
      });
  });

  document.getElementById("reset").addEventListener("click", () => {
    counterContract.methods.reset().send({from: ethereum.selectedAddress})
      .then(() => {
        return counterContract.methods.getCounter().call();
      })
      .then((counter) => {
        document.getElementById("counter").innerHTML = counter;
      });
  });
}
