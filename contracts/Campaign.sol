// SPDX-License-Identifier: Unlicensed

pragma solidity >0.7.0 <=0.9.0;


contract Campaign {
    string public title;
    uint public requiredAmount;
    string public image;
    string public story;
    address payable public owner;
    uint public receivedAmount;

    event donated(address indexed donar, uint indexed amount, uint indexed timestamp);
    event withdrawn(address campaignowner, uint indexed amount);

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
        require(msg.value <= 1000000000000000000, "Donation amount should be less than 1 ETH");
        receivedAmount += msg.value;
        emit donated(msg.sender, msg.value, block.timestamp);
    }
    function withdraw() public payable {
        require(msg.sender == owner, "Only the owner of the campaign can withdraw");
        require(receivedAmount > requiredAmount, "Required amount not fulfilled yet");
        owner.transfer(receivedAmount);
        receivedAmount = 0;
    emit withdrawn(msg.sender, msg.value);
    }

    
}

contract CampaignFactory {
    address[] public deployedCampaigns;

    event campaignCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address campaignAddress,
        string imgURI,
        uint indexed timestamp,
        string indexed category
    );

    function createCampaign(
        string memory campaignTitle, 
        uint requiredCampaignAmount, 
        string memory imgURI, 
        string memory category,
        string memory storyURI) public
    {

        Campaign newCampaign = new Campaign(
            campaignTitle, requiredCampaignAmount, imgURI, storyURI, msg.sender);
        

        deployedCampaigns.push(address(newCampaign));

        emit campaignCreated(
            campaignTitle, 
            requiredCampaignAmount, 
            msg.sender, 
            address(newCampaign),
            imgURI,
            block.timestamp,
            category
        );

    }
}

