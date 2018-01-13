pragma solidity ^0.4.0;
contract Job {
    struct Bidder {
        address private wallet;
        string private cypherText;
        bool private exists;
    }

    // Secure State
    address private owner;
    uint private payoutAmountGwei;
    uint private maxParticipants;
    mapping(string => Bidder) private bidder;

    // Clients will encrypt using this value.
    string private piiPublicKey;

    // Presented Metadata
    uint private callLengthMinutes;

    function Job(uint _minutes, uint _payout, string _piiPublicKey) public {
        owner = msg.sender;
        payoutAmountGwei = _payout;
        piiPublicKey = _piiPublicKey;
    }

    // NOTE: this can only be called once per keyable value, this is to prevent overwriting existing data maliciously.
    function registerBidder(string keyable, string cypherText, address wallet) public {
        // Disallow overwriting existing data
        if (bidder[keyable].exists == false) return;

        // TODO: Disallow max capacity
        bidder[keyable] = Bidder(wallet, cypherText, true);
    }

    function payParticipant(string keyable) private {
        if (msg.sender != owner) return;
        if (this.balance > 0) return;
        // validate sender has the right balance
        bidder[keyable].wallet.transfer(payoutAmountGwei);
    }
}
