pragma solidity ^0.4.0;
contract JobListing {
    struct Job {
        address ownerWallet;
        bytes32 description;
        uint payout;
        bool completed;
        bool exists;
    }

    address private owner;
    mapping(bytes32 => Job) private jobs;
    bytes32[] jobKeys;
    bytes32[] jobDescriptions;
    uint[] jobPayouts;

    function JobListing() public {
        owner = msg.sender;
    }
    
    function addJob(address ownerWallet, bytes32 description, uint payout) public {
        bytes32 keyToJob = description;
        jobs[keyToJob].ownerWallet = ownerWallet;
        jobs[keyToJob].description = description;
        jobs[keyToJob].payout = payout;
        jobs[keyToJob].completed = false;
        jobs[keyToJob].exists = true;
        
        jobKeys.push(keyToJob);
        jobDescriptions.push(description);
        jobPayouts.push(payout);
    }

    function getJobs() public returns(bytes32[], bytes32[], uint[]) {
        return(jobKeys, jobDescriptions, jobPayouts);
        //iterate through jobs mapping and return
    }

    function () public payable { }
}
