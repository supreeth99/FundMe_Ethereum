import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //we are in the browser and metamask is running.
  web3 = new Web3(window.web3.currentProvider);
} else {
  //running on nextjs server OR user is not running metamask.
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/fcda74d553b841a392f8f6244c6c19b4"
  );

  web3 = new Web3(provider);
}

export default web3;
