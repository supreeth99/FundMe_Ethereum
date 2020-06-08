// solium-disable linebreak-style
pragma solidity >=0.6.0 <0.7.0;
import "./Fundme.sol";

contract FundFactory{
    address[] public activeFunds;

    function createFund(uint goal,string memory cname,string memory description) public{
        address Fund = address(new Fundme(goal,msg.sender,cname,description));
        activeFunds.push(Fund);
    }

    function getActiveFunds() public view returns(address[] memory){
        return activeFunds;
    }
}
