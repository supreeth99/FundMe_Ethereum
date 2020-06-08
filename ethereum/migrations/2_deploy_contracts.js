const Fund = artifacts.require("Fundme")
const Fundfactory = artifacts.require("FundFactory")
module.exports = function(deployer) {
    deployer.deploy(Fundfactory);
    }
