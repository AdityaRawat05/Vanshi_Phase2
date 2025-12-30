// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "./interfaces/IVanshiCredit.sol";

contract VanshiMarketplace is AccessControl, ERC1155Holder {
    using SafeERC20 for IERC20;

    IVanshiCredit public creditContract;
    IERC20 public paymentToken; // e.g., USDC or MockUSDC
    address public treasury;
    
    // Fee in Basis Points (10000 = 100%). Example: 250 = 2.5%
    uint256 public platformFeeBps; 

    event CreditsBought(address indexed buyer, uint256 indexed projectId, uint256 amount, uint256 totalCost, uint256 fee);
    event FeeUpdated(uint256 oldFee, uint256 newFee);
    event TreasuryUpdated(address oldTreasury, address newTreasury);

    constructor(
        address _vanshiCredit,
        address _paymentToken,
        address _treasury,
        uint256 _feeBps
    ) {
        require(_vanshiCredit != address(0), "Invalid VanshiCredit address");
        require(_paymentToken != address(0), "Invalid PaymentToken address");
        require(_treasury != address(0), "Invalid Treasury address");
        require(_feeBps <= 10000, "Fee too high");

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        
        creditContract = IVanshiCredit(_vanshiCredit);
        paymentToken = IERC20(_paymentToken);
        treasury = _treasury;
        platformFeeBps = _feeBps;
    }

    /**
     * @dev Buy credits from a project developer.
     * The developer must have minted the credits and approved this Marketplace contract to sell them.
     */
    function buyCredits(uint256 _projectId, uint256 _amount) public {
        require(_amount > 0, "Amount must be > 0");
        
        // Explicitly declare return variables
        address projectOwner;
        uint256 price;

        (
            , // projectId
            projectOwner,
            , // totalCap
            , // mintedCount
            price,
            , // vintage
              // status
        ) = creditContract.projects(_projectId);

        require(projectOwner != address(0), "Project does not exist");
        
        // 2. Calculate Costs
        uint256 totalCost = price * _amount;
        uint256 feeAmount = (totalCost * platformFeeBps) / 10000;
        uint256 sellerAmount = totalCost - feeAmount;

        // 3. Execution
        
        // Transfer Fee to Treasury
        if (feeAmount > 0) {
            paymentToken.safeTransferFrom(msg.sender, treasury, feeAmount);
        }
        
        // Transfer Rest to Project Developer
        if (sellerAmount > 0) {
            paymentToken.safeTransferFrom(msg.sender, projectOwner, sellerAmount);
        }

        // Transfer Credits from Developer to Buyer
        // Note: Developer must have called setApprovalForAll(marketplaceAddress, true)
        creditContract.safeTransferFrom(projectOwner, msg.sender, _projectId, _amount, "");

        emit CreditsBought(msg.sender, _projectId, _amount, totalCost, feeAmount);
    }

    /**
     * @dev Buy and immediately retire (burn) credits.
     * Useful for API integrations that want one-click offset.
     */
    function retireCredits(uint256 _projectId, uint256 _amount) external {
        buyCredits(_projectId, _amount);
        // Burn the credits the buyer just received
        creditContract.burn(msg.sender, _projectId, _amount);
    }

    // Admin Functions

    function setFee(uint256 _newFeeBps) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_newFeeBps <= 10000, "Fee too high");
        emit FeeUpdated(platformFeeBps, _newFeeBps);
        platformFeeBps = _newFeeBps;
    }

    function setTreasury(address _newTreasury) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_newTreasury != address(0), "Invalid address");
        emit TreasuryUpdated(treasury, _newTreasury);
        treasury = _newTreasury;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControl, ERC1155Holder)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
