// SPDX-License-Identifier: Unlicensed

pragma solidity >0.8.0 <=0.9.0;

contract Campaign {
    string public title;
    uint public requiredAmount;
    string public image;
    string public story;
    address payable public owner;
    uint public receivedAmount;
    bool public acceptingDonation = true;

    event donated(address indexed donar, uint indexed amount, uint indexed timestamp);
    event withdrawn(uint amount);
    
    error TooHighDonation(string message, uint256 donationRemaining);

    constructor(
        string memory campaignTitle, 
        uint requiredCampaignAmount, 
        string memory imgURI,
        string memory storyURI,
        address campaignOwner
    ) {
        title = campaignTitle;
        requiredAmount = requiredCampaignAmount;
        image = imgURI;
        story = storyURI;
        owner = payable(campaignOwner);
    }


    function donate() public payable {
        require(msg.value > 0,"Msg.value = 0");
        if (msg.value > requiredAmount - receivedAmount) revert TooHighDonation({
                message: "Donation room left",
                donationRemaining:requiredAmount - receivedAmount
            });
        receivedAmount += msg.value;
        if (receivedAmount >= requiredAmount) {
            acceptingDonation = false;
        }
        emit donated(msg.sender, msg.value, block.timestamp);
    }

    function withdraw() public payable {
        require(!acceptingDonation, "Campaign still not over");
        require(msg.sender == owner, "Only the owner of the campaign can withdraw");
        owner.transfer(receivedAmount);
        emit withdrawn(receivedAmount);
    }

    //@TODO: need to check why is the contract not receiving direct messages
    fallback() external payable {
        donate();
    }

    receive() external payable {
        donate();
    }

}



