// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";

contract VanshiCredit is AccessControl, ERC1155, ERC1155Supply, ERC1155URIStorage {
    
    struct Project {
        uint256 id;
        address owner;
        uint256 totalCap;
        uint256 mintedCount;
        uint256 price; // In stablecoin units (e.g., 6 decimals for USDC)
        uint256 vintage;
        string status; // "Active", "Suspended", "Retired"
    }

    // Mapping from Project ID => Project Details
    mapping(uint256 => Project) public projects;
    
    // Counter for Project IDs
    uint256 public nextProjectId;

    // Events
    event ProjectCreated(uint256 indexed id, address indexed owner, uint256 cap, uint256 price);
    event ProjectPriceUpdated(uint256 indexed id, uint256 oldPrice, uint256 newPrice);
    event CreditsMinted(uint256 indexed id, uint256 amount);
    event CreditsRetired(address indexed account, uint256 indexed id, uint256 amount);
    event ForestVerified(uint256 indexed forestId, string analysisHash);

    constructor() ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        nextProjectId = 1; // Start IDs from 1
    }

    /**
     * @dev Creates a new Project. Only Admin can call.
     * @param _developer Address of the project owner who receives funds.
     * @param _cap Max credits that can be minted.
     * @param _price Price per credit.
     * @param _vintage Year of vintage.
     * @param _metadataURI URI for project metadata (IPFS/Backend).
     */
    function createProject(
        address _developer,
        uint256 _cap,
        uint256 _price,
        uint256 _vintage,
        string memory _metadataURI
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_developer != address(0), "Invalid developer address");
        require(_cap > 0, "Cap must be > 0");

        uint256 projectId = nextProjectId;
        
        projects[projectId] = Project({
            id: projectId,
            owner: _developer,
            totalCap: _cap,
            mintedCount: 0,
            price: _price,
            vintage: _vintage,
            status: "Active"
        });

        _setURI(projectId, _metadataURI);
        
        emit ProjectCreated(projectId, _developer, _cap, _price);
        nextProjectId++;
    }

    /**
     * @dev Updates the price of a project's credit. Only Admin.
     */
    function updateProjectPrice(uint256 _projectId, uint256 _newPrice) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_projectId < nextProjectId, "Project does not exist");
        uint256 oldPrice = projects[_projectId].price;
        projects[_projectId].price = _newPrice;
        
        emit ProjectPriceUpdated(_projectId, oldPrice, _newPrice);
    }

    /**
     * @dev Mints credits to the project developer. Only Admin.
     */
    function mintCredits(uint256 _projectId, uint256 _amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_projectId < nextProjectId, "Project does not exist");
        Project storage project = projects[_projectId];
        
        require(keccak256(bytes(project.status)) == keccak256(bytes("Active")), "Project is not active");
        require(project.mintedCount + _amount <= project.totalCap, "Exceeds project cap");

        project.mintedCount += _amount;
        _mint(project.owner, _projectId, _amount, "");
        
        emit CreditsMinted(_projectId, _amount);
    }

    /**
     * @dev Burns credits (Retirement). Publicly callable by credit holders.
     */
    function burn(address _account, uint256 _id, uint256 _amount) external {
        require(_account == msg.sender || isApprovedForAll(_account, msg.sender), "Caller is not owner nor approved");
        _burn(_account, _id, _amount);
        emit CreditsRetired(_account, _id, _amount);
    }

    /**
     * @dev Admin can update metadata URI if needed.
     */
    function setURI(uint256 _id, string memory _newURI) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setURI(_id, _newURI);
    }

    /**
     * @dev Stores the analysis hash of a verified forest. Only Admin.
     */
    function verifyForest(uint256 forestId, string memory analysisHash) external onlyRole(DEFAULT_ADMIN_ROLE) {
        emit ForestVerified(forestId, analysisHash);
    }

    // Overrides required by Solidity

    function uri(uint256 tokenId) public view override(ERC1155, ERC1155URIStorage) returns (string memory) {
        return super.uri(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
}
