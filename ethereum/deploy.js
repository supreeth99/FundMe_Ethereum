const HDWalletProvider = require("truffle-hdwallet-provider");
const fs = require('fs-extra'); 
const Web3 = require("web3");
const compiledFactory = require("../fundme/build/FundFactory.json");
const mneumonic = fs.readFileSync(".secrets").toString().trim();
const provider = new HDWalletProvider(
  mneumonic,
  "https://rinkeby.infura.io/v3/fcda74d553b841a392f8f6244c6c19b4"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  //console.log('Attempting to deploy from the account',accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0] })
    .on('error',function(error){
        console.log("error:",error);
    })

  //result.setProvider(provider);
  //console.log(compiledFactory.interface);
  console.log("contract deployed at", result.options.address);
};
deploy();

//contract deployed at 0x240887ABf0c6D4E0Bab74FC96B770F0422c91558
