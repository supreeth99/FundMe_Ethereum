import web3 from "./web3";
import compiledFactory from "../fundme/build/FundFactory.json";

const instance = new web3.eth.Contract(
  (compiledFactory.abi),
  "0x7A91340D7274Dc029D42183cBfEB77448Db132f5"
);

export default instance;
