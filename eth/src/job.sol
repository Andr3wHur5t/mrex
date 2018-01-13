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
<<<<<<< HEAD
    
    function lookupBidderByNumber(string encryptedPhoneNumber) private returns (address) {
        address bidder;
        return bidder;
=======

    function payParticipant

    address chairperson;
    mapping(address => Voter) voters;
    Proposal[] proposals;

    /// Create a new ballot with $(_numProposals) different proposals.
    function Ballot(uint8 _numProposals) public {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        proposals.length = _numProposals;
    }

    /// Give $(toVoter) the right to vote on this ballot.
    /// May only be called by $(chairperson).
    function giveRightToVote(address toVoter) public {
        if (msg.sender != chairperson || voters[toVoter].voted) return;
        voters[toVoter].weight = 1;
    }

    /// Delegate your vote to the voter $(to).
    function delegate(address to) public {
        Voter storage sender = voters[msg.sender]; // assigns reference
        if (sender.voted) return;
        while (voters[to].delegate != address(0) && voters[to].delegate != msg.sender)
            to = voters[to].delegate;
        if (to == msg.sender) return;
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegateTo = voters[to];
        if (delegateTo.voted)
            proposals[delegateTo.vote].voteCount += sender.weight;
        else
            delegateTo.weight += sender.weight;
    }

    /// Give a single vote to proposal $(toProposal).
    function vote(uint8 toProposal) public {
        Voter storage sender = voters[msg.sender];
        if (sender.voted || toProposal >= proposals.length) return;
        sender.voted = true;
        sender.vote = toProposal;
        proposals[toProposal].voteCount += sender.weight;
>>>>>>> e4e07cec6cc40a7914fbbe759f73f594a8e60924
    }
    
    function payParticipant(string encryptedPhoneNumber) private {
        if (msg.sender != owner) return;
        if (this.balance > 0) return;
        // validate sender has the right balance
        address bidder = lookupBidderByNumber(encryptedPhoneNumber);
        bidder.transfer(payoutAmountGwei);
    }
}
