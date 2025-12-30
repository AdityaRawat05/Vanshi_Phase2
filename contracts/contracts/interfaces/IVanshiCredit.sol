// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IVanshiCredit {
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) external;
    function burn(address account, uint256 id, uint256 amount) external;
    
    // Auto-generated getter for public mapping projects(uint256)
    function projects(uint256 id) external view returns (
        uint256 projectId,
        address owner,
        uint256 totalCap,
        uint256 mintedCount,
        uint256 price,
        uint256 vintage,
        string memory status
    );
}
