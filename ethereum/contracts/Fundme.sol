// solium-disable linebreak-style
pragma solidity >=0.6.0 <0.7.0;
pragma experimental ABIEncoderV2;
contract Fundme{
    address payable public createrAddress;
    string public createrName;
    uint public goal;
    string public description;
    uint public totalContribution;
    uint public currentBalance;
    uint public totalContributors;
    string[] public donators;
    modifier restricted(){
        require(createrAddress == msg.sender,"This function can be called only by Owner.");
        _;
    }

    constructor (uint amount,address creater,string memory cname,string memory desc) public{
        createrAddress = payable(creater);
        goal = amount;
        createrName = cname;
        description = desc;
        currentBalance = address(this).balance;
    }
    function donate(string memory name) public payable{
        require(msg.value >= 100,"Minimum contribution is 100 Wei");
        totalContribution = totalContribution + msg.value;
        currentBalance = address(this).balance;
        donators.push(name);
        //Checknew[msg.sender]=true;
        totalContributors++;
    }
    function checkout(uint value) public restricted{
        require(address(this).balance>=value,"Requested amount is more than current balance.");
        createrAddress.transfer(value);
        currentBalance = address(this).balance;
    }
    function getDetails() public view returns(
      uint,uint,uint,address,string memory,string memory,uint
      ) {
      return(
        goal,
        totalContributors,
        address(this).balance,
        createrAddress,
        description,
        createrName,
        totalContribution
        );
    }
    function getDonaterDetails() public view returns(string[] memory){
        return donators;
    }
}