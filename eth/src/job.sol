pragma solidity ^0.4.0;
contract Job {

    struct Marketer {
        address wallet;
        string addresss;
    }
    
    address owner;
    uint payoutAmountGwei;
    uint callLengthMinutes;
    uint maxParticipants;

    function Job(address _marketerWallet, uint _minutes, uint _payout) public {
        owner = msg.sender;
        payoutAmountGwei = _payout;
        
    }
    
    function lookupBidderByNumber(string encryptedPhoneNumber) private returns (address) {
        address bidder;
        return bidder;
    }
    
    function payParticipant(string encryptedPhoneNumber) private {
        if (msg.sender != owner) return;
        if (this.balance > 0) return;
        // validate sender has the right balance
        address bidder = lookupBidderByNumber(encryptedPhoneNumber);
        bidder.transfer(payoutAmountGwei);
    }
}
