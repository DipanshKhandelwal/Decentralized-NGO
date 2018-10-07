
// This file contains functions which interact with the specified project instances. 
const compiledproject = require("../ethereum/build/Project.json");

const {readProjects, web3, deployProject} = require("./store.js");

const getAllProjects = async() => {

	return await readProjects()
		.then( async (deployedProjects) => {
			
		const accounts = await  web3.eth.getAccounts();
		
		const projectDetailList = [];
		for(i in deployedProjects){		
			const project = await new web3.eth.Contract((JSON.parse(compiledproject.interface)), 
			deployedProjects[i]);

			const projectName = await project.methods.projectName().call();
			const projectDesc = await project.methods.projectDesc().call();
			const creatorName = await project.methods.creatorName().call();
			const creatorContact = await project.methods.creatorContact().call();
			
			projectDetailList.push({
				address: deployedProjects[i],
				projectName,
				projectDesc,
				creatorName,
				creatorContact
			});
			delete project, projectName, projectDesc, creatorContact, creatorName;
		}
		console.log(projectDetailList);
		return projectDetailList;
	});
}

const getProjectDetails = async(address) => {

	const accounts = await  web3.eth.getAccounts();		
	const projectDetailList = {};
	
	const project = await new web3.eth.Contract((JSON.parse(compiledproject.interface)), 
	address);
	
	const projectName = await project.methods.projectName().call();
	const projectDesc = await project.methods.projectDesc().call();
	const creatorName = await project.methods.creatorName().call();
	const creatorContact = await project.methods.creatorContact().call();
	const minContribution = await project.methods.minContribution().call();
	const approversCount = await project.methods.approversCount().call();

	try {
		const request = await project.methods.requests(0).call();
	}
	catch(err){

		console.log({projectName, projectDesc, creatorName, creatorContact, minContribution, approversCount})
		return {projectName, projectDesc, creatorName, creatorContact, minContribution, approversCount}
	
	}
	let i = 1;
	let requestDetail = [];
	
	while(request.description != null){
		requestDetail.push({
			description: request.description,
			value : request.value
		});
		i++;
		request = await project.methods.requests(i).call();
	}
	delete project,i,request; 	
	console.log(projectName, projectDesc, creatorName, creatorContact, minContribution, approversCount, requestDetail)
	return {projectName, projectDesc, creatorName, creatorContact, minContribution, approversCount, requestDetail}
}

// Function to contribute to a project
const contribute = async(address, amount) => {
	
	const project = await new web3.eth.Contract((JSON.parse(compiledproject.interface)), 
		address);

	const accounts = await  web3.eth.getAccounts();
	
	await project.methods.contribute(web3.utils.toWei(amount, "ether")).send({
		from: accounts[0],
		value: web3.utils.toWei(amount,"ether")
	});

}

//contribute(1, 124)

//getAllProjects();

//getProjectDetails("0x08a701EC7c1616cE5CBdacb0A65d26783ef8Cb72")

contribute("0x08a701EC7c1616cE5CBdacb0A65d26783ef8Cb72", "1")

