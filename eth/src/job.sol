pragma solidity ^0.4.0;
contract Job {
    struct Bidder {
        address wallet;
        string cypherText;
        bool exists;
    }

    address owner;
    uint payoutAmountGwei;
    uint callLengthMinutes;
    uint maxParticipants;

    // Keyable must be the same between the client and the server.
    mapping(string => Bidder) private bidder;

    function Job(address _marketerWallet, uint _minutes, uint _payout) public {
        owner = msg.sender;
        payoutAmountGwei = _payout;

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
