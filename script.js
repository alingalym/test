const contractAddress = "0x37722E7a5D00DD43C0372eECF27968dB0Db4E35d";
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_option",
				"type": "uint8"
			}
		],
		"name": "playGame",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "getRes",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "myRes",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const provider = new ethers.providers.Web3Provider(window.ethereum, 97); //bnbchain testnet
let signer;
let contract;

//Нужно будет создать функцию
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    contract = new ethers.Contract(contractAddress, abi, signer);
  });
});

async function play(option) {
  let amountInWei = ethers.utils.parseEther((0.001).toString());
  console.log(amountInWei);

  //let _result = await contract.playGame(option, { value: amountInWei });
  let _result = await contract.playGame(option);
}

async function getGamePlayed() {
  /*let queryResult = await contract.queryFilter(
    "GamePlayed",
    (await provider.getBlockNumber()) - 5000,
    await provider.getBlockNumber()
  );
  let queryResultRecent = queryResult[queryResult.length - 1];

  let player = await queryResultRecent.args.player.toString();
  let result = await queryResultRecent.args.myRes.toString();*/

  let resultLogs = await contract.getRes();
  //  player: ${player}, 
  //  result: ${result == "Lose" ? "LOSE 😥" : "WIN 🎉"}`;
  //console.log(result);

  let resultLog = document.getElementById("result");
  resultLog.innerText = resultLogs;
}