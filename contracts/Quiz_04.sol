// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title OPZ
 */
contract OPZ is
    ERC20,
    ERC20Burnable,
    ERC20Snapshot,
    ERC20Capped,
    Ownable,
    Pausable
{
    address public liquidityPoolAddr;
    address public riskVaultAddr;

    event LiquidityPoolChanged(address indexed newLiquidityPool);
    event RiskVaultChanged(address indexed newRiskVault);

    // initialSupply: total amount of tokens that should be release in TGE
    constructor(uint256 initialSupply, uint256 cap)
        ERC20("OPZ", "OPZ")
        ERC20Capped(cap)
    {
        _mint(msg.sender, initialSupply);

        // TODO: transfer tokens on TGE
    }

    modifier onlyMinter() {
        require(
            msg.sender == owner() ||
                msg.sender == liquidityPoolAddr ||
                msg.sender == riskVaultAddr,
            "Only owner, liquidity pool, and risk vault can mint the token"
        );
        _;
    }

    // public functions
    function setLiquidityPool(address _newLiquidityPool) public onlyOwner {
        liquidityPoolAddr = _newLiquidityPool;
        emit LiquidityPoolChanged(_newLiquidityPool);
    }

    function setRiskVault(address _newRiskVault) public onlyOwner {
        riskVaultAddr = _newRiskVault;
        emit RiskVaultChanged(_newRiskVault);
    }

    function snapshot() public onlyOwner {
        _snapshot();
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyMinter {
        _mint(to, amount);
    }

    // internal functions
    function _mint(address account, uint256 amount)
        internal
        virtual
        override(ERC20, ERC20Capped)
    {
        return super._mint(account, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Snapshot) whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
