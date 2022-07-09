// SPDX-License-Identifier: Unlicensed
pragma solidity >0.8.0 <=0.9.0;

import { Campaign } from "./Campaign.sol";

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
        string memory storyURI) public returns (Campaign newCampaign)
    {
        newCampaign = new Campaign(
            campaignTitle, 
            requiredCampaignAmount, 
            imgURI, 
            storyURI, 
            msg.sender
        );
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