
// This file contains read() which returns a promise containing the contract instance of inbox
const Web3 = require("web3");
const hdWalletProvider = require("truffle-hdwallet-provider");
const compiledStore = require("../ethereum/build/projectStore.json");

const getWeb3 = async()=> {
	const provider = new hdWalletProvider(
		"cousin wasp clip dynamic advance devote this million magic bean ceiling anger",
		"https://rinkeby.infura.io/v3/e8bccfbf91864d7ea8797b0ae8b2d30a"  // This address will be generated through infura 
	);
	
	return new Web3(provider);
}

const read = async () => {

	const web3 = await getWeb3();
	
	const accounts = await  web3.eth.getAccounts();
	const store = await new web3.eth.Contract((JSON.parse(compiledStore.interface)), 
		"0x97709358b13c070E20cbe0d314834244E1f0D834");
	
	/*  Code to deploy a new camapign
	console.log("Deployed Camapigns Initially- ", await store.methods.getDeployedprojects().call())
	await store.methods.createproject(123).send(({gas: "1000000", from: accounts[0]}));	
	console.log("Deployed Camapigns After createproject() call- ", await store.methods.getDeployedprojects().call())
	*/

	return await store.methods.getDeployedprojects().call();
} 

//read();

module.exports = {read,getWeb3};
