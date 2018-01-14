pragma solidity ^0.4.0;
contract Job {
    struct Bidder {
        address wallet;
        bytes32 cypherText;
        bool completed;
        bool exists;
    }

    // Secure State
    address private owner;
    uint public payoutAmountGwei;
    Bidder bidder;

    //uint private maxParticipants;
    //mapping(bytes32 => Bidder) private bidder;
    //bytes32[] public biddersArrayKeyables;
    //bytes32[] public biddersArrayCyphers;

    // Log the send money event
    event LogCoinsSent(address sentTo, uint amount);
    event BidderRegistered(address wallet);

    // Clients will encrypt using this value.
    string private piiPublicKey;

    // Presented Metadata
    uint public callLengthMinutes;

    //function Job(uint _payout) public {
    function Job(uint _minutes, uint _payout, string _piiPublicKey) public {
        owner = msg.sender;
        payoutAmountGwei = _payout;
        piiPublicKey = _piiPublicKey;
        callLengthMinutes = _minutes;
    }

    // NOTE: this can only be called once per keyable value, this is to prevent overwriting existing data maliciously.
    function registerBidder(bytes32 cypherText, address wallet) public {
        // Disallow overwriting existing data
        if (bidder.exists == true) return;

        // TODO: Disallow max capacity
        bidder.wallet = wallet;
        bidder.cypherText = cypherText;
        bidder.exists = true;

        // biddersArrayKeyables.push(keyable);
        // biddersArrayCyphers.push(cypherText);
        // BidderRegistered(wallet);
    }

    function payParticipant() public returns(bool)  {
        if (msg.sender != owner) return false;
        if (this.balance < 0) return false;
        if (bidder.completed == true) return;
        bidder.completed = true;
        bidder.wallet.transfer(payoutAmountGwei);
        return true;
    }

    function () public payable { }
}
