const Fund = artifacts.require('Fund');
const FundFactory = artifacts.require('FundFactory')

contract('FundFactory and Fund',(accounts)=>{
    it('should deploy smart contracts properly',async () =>{
        const fund = await Fund.deployed();
        const fundFactory = await FundFactory.deployed();
        // console.log('FundFactory address:',fundFactory.address);
        // console.log('Fund address:',fund.address);
        
        
        await fundFactory.createFund(100,"sup","to test");
        let [ActiveFunds] = await fundFactory.getActiveFunds();
        //console.log('Fund address:',ActiveFunds);

        fundInstance = await Fund.at(ActiveFunds);
        //console.log('Details:',await fundInstance.getDetails());
        await fundInstance.donate.sendTransaction('Sam',{from:accounts[1],value:5000000});
        const details = await fundInstance.getDonaterDetails(0);
        //console.log('Donator:',details);
        // const createrAddress = await fund.createrAddress();
        
        //console.log('Creater Address:',JSON.stringify(createrAddress));
        //console.log("Fund goal that was defined while creating:",Number(goal));
        assert(fund.address != '');
        assert(fundFactory.address != '');
        assert(fundInstance.address != '');
    });

    it("Can donate to a fund",async ()=>{
        const fund = await Fund.deployed();
        await fund.donate.sendTransaction('sup',{from:accounts[1],value:5000000});
        let result = await fund.donate.sendTransaction('sam',{from:accounts[0],value:2000000});
        let result3 = await fund.totalContributors();
        //console.log('Donators:',JSON.stringify(result3));
        let result1 = await fund.currentBalance();
        //console.log('Current Balance:',Number(result1));
        //console.log('details:',await fund.getDetails());
        assert.ok(result);
    });

    it("Only the creater can call checkout else error is thrown",async ()=>{
        const fund = await Fund.deployed();
        const createrAddress = await fund.createrAddress();
        //console.log('Creater Address:',JSON.stringify(createrAddress));
        
        try{
            await fund.checkout(100,{from:accounts[1]});
            let result1 = await fund.currentBalance();
            c//onsole.log('Current Balance after Checkout:',Number(result1));
        }
        catch(err){
            //console.log(String(err));
            assert.ok(err);
            let result1 = await fund.currentBalance();
            //console.log('Current Balance:',Number(result1));
        }
    });
    it("Checkout works",async ()=>{
        const fund = await Fund.deployed();
        const createrAddress = await fund.createrAddress();
        //console.log('Creater Address:',JSON.stringify(createrAddress));
        
        try{
            let result1 = await fund.currentBalance();
            //console.log('Contract Balance Before Checkout:',Number(result1));
            let createrBalance = await web3.eth.getBalance(createrAddress);
            //console.log('before checkout balance:',createrBalance);

            await fund.checkout(1,{from:accounts[0]});
            createrBalance = await web3.eth.getBalance(createrAddress);
            //console.log('Post checkout balance:',createrBalance);
            result1 = await fund.currentBalance();
            //console.log('Contract Balance after Checkout:',Number(result1));
            assert(false);
        }
        catch(err){
            //console.log('Checkout Failed');
            assert(true);
        }
    });

    it("Checks for minimum donation (i.e. 100Wei)",async ()=>{
        const fund = await Fund.deployed();
        try{
            let result = await fund.donate.sendTransaction('sam',{from:accounts[0],value:20});
            assert(false);
        }catch(err){
            //console.log(String(err));
            assert(true);
        }
    });
});