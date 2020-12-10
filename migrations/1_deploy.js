const LDFToken = artifacts.require('LDFToken');
const LearnDeFi = artifacts.require('LearnDeFi');


module.exports = async function(deployer,network,accounts) {

  

  await deployer.deploy(LDFToken);
  const ldfToken = await LDFToken.deployed();

await deployer.deploy(LearnDeFi,ldfToken.address);
const learnDeFi = await LearnDeFi.deployed();

// Deploy and migrate above contract npmis working

await ldfToken.transfer(learnDeFi.address,'500000000000000000000')

await ldfToken.transfer(accounts[0],'500000000000000000000')


};
