/**
 * SPDX-License-Identifier: UNLICENSED
 */
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "TTT") {
        // todo
    }

    // function mint(address account, uint256 amount) public {
    //     _mint(account, amount);
    // }

    function mint(address account, uint256 amount) public payable  {
        require(msg.value == 0.1 ether * amount);
        _mint(account, amount);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdraw() public {
        payable(msg.sender).transfer(address(this).balance);
    }

}