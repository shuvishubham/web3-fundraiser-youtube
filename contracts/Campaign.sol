// SPDX-License-Identifier: Unlicensed

pragma solidity >0.8.0 <=0.9.0;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Campaign is ReentrancyGuard {

    mapping( address => uint ) public contributers;
    string public title;
    uint public requiredAmount;
    string public image;
    string public story;
    address payable public owner;
    uint public receivedAmount;
    bool public acceptingDonation = true;
    uint public deadline;

    event donated(address indexed donar, uint indexed amount, uint indexed timestamp);
    event withdrawn(uint amount);
    
    error TooHighDonation(string message, uint256 donationRemaining);

    constructor(
        string memory campaignTitle, 
        uint requiredCampaignAmount, 
        string memory imgURI,
        string memory storyURI,
        address campaignOwner,
        uint campaignDeadline
    ) ReentrancyGuard () {
        title = campaignTitle;
        requiredAmount = requiredCampaignAmount;
        image = imgURI;
        story = storyURI;
        owner = payable(campaignOwner);
        deadline = campaignDeadline; 
    }


    function donate() public payable {
        require(acceptingDonation);
        require(block.timestamp < deadline, "Deadline has Ended!");
        require(msg.value > 0,"Msg.value = 0");
        if (msg.value > requiredAmount - receivedAmount) revert TooHighDonation({
                message: "Donation room left",
                donationRemaining:requiredAmount - receivedAmount
            });
        receivedAmount += msg.value;
        contributers[msg.sender] += msg.value;
        if (receivedAmount >= requiredAmount) {
            acceptingDonation = false;
        }
        emit donated(msg.sender, msg.value, block.timestamp);
          
    }

    function withdraw() public {
        require(!acceptingDonation, "Campaign still not over");
        require(msg.sender == owner, "Only the owner of the campaign can withdraw");
        owner.transfer(receivedAmount);
        emit withdrawn(receivedAmount);
    }


    function refund () public payable {
        require(block.timestamp > deadline && receivedAmount < requiredAmount);
        require(contributers[msg.sender] > 0,"Not eligible for refund");
        address payable user = payable(msg.sender);
        user.transfer(contributers[msg.sender]);
        contributers[msg.sender] = 0;
    }

    fallback() external payable {
        donate();
    }

    receive() external payable {
        donate();
    }

}
