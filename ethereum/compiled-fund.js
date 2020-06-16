import web3 from "./web3";
import compiledFund from "../build/Fundme.json";

export default (address) => {
  return new web3.eth.Contract(compiledFund.abi, address);
};
