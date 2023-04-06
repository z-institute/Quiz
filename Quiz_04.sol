// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyTokenUSDT is ERC20 {
    constructor () ERC20 ("MyToken", "TTT"){}

    // use USDT to mint
    function mint() external {
        // need to do approve first (via script or UI), approve(0xcontract, 1000000)
        IERC20(0x509Ee0d083DdF8AC028f2a56731412edD63223B9).transferFrom(msg.sender, address(this), 1000000);
        // IERC721(0x1234)
        _mint(msg.sender, 1 ether); 
    }

    function mintByETH() external payable {
        require(msg.value == 1 ether, "Not enough");
        _mint(msg.sender, 1 ether);
    }
}
