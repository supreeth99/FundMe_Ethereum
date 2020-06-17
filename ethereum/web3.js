import Web3 from "web3";
let web3;
if (typeof window !== "undefined") {
  if (typeof window.ethereum !== "undefined") {
    //we are in the browser
    web3 = new Web3(window.web3.currentProvider);
    window.ethereum.enable();
  } else {
    const provider = new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/1f9f268df815438385afcda5b791dac0" //Use infura rinkeby endpoint
    );
    web3 = new Web3(provider);
    const metamask = "https://metamask.io"
    alert(`Oops!! Looks like you haven't installed metamask. You will be redirected to ${metamask} to install the chrome extension`)
    window.location.replace(metamask)
  }
} else {
  // we are not on the browser *OR* the user does not have metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/1f9f268df815438385afcda5b791dac0" //Use infura rinkeby endpoint
  );
  web3 = new Web3(provider);
}
export default web3;