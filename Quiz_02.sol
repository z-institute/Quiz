/**
 * SPDX-License-Identifier: UNLICENSED
 */
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract MyToken is ERC721, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC721("MyToken", "TTT") {
        _setupRole(MINTER_ROLE, msg.sender);
    }

    function mint(address account, uint256 tokenId) public payable onlyRole(MINTER_ROLE)  {
        require(msg.value == 0.1 ether);
        _mint(account, tokenId);
    }
    function batchMint(address to, uint256[] memory tokenIds) public payable onlyRole(MINTER_ROLE) {
        require(msg.value == 0.1 ether * tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            mint(to, tokenIds[i]);
        }
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControl, ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    
}