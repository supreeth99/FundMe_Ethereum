import web3 from "./web3";
import compiledFactory from "../build/FundFactory.json";


const instance = new web3.eth.Contract(
  (compiledFactory.abi),"0x240887ABf0c6D4E0Bab74FC96B770F0422c91558");
export default instance;
