const Fund = artifacts.require("Fund")
const Fundfactory = artifacts.require("FundFactory")
module.exports = function(deployer) {
    deployer.deploy(Fundfactory);
    }
