
// This file contains functions which interact with the specified project instances. 
const compiledproject = require("../ethereum/build/project.json");

const {read, getWeb3} = require("./store.js");

const getproject = async(index) => {

	return await read()
		.then( async (deployedprojects) => {
			
		const web3 = await getWeb3();
		const accounts = await  web3.eth.getAccounts();
		
		console.log(deployedprojects)
		
		return await new web3.eth.Contract((JSON.parse(compiledproject.interface)), 
		deployedprojects[index]);

	});

}

// Function to contribute to a project
const contribute = async(index, amount) => {
	
	const project = await getproject(index)
	//console.log(await project.methods.manager().call());
	
	const web3 = await getWeb3();
	const accounts = await  web3.eth.getAccounts();
	
	await project.methods.contribute().send({
		from: accounts[0],
		value: web3.utils.toWei("0.11","ether")
	});
	
	console.log("Approver Count- ", await project.methods.approversCount().call())
	
}

contribute(1, 124)