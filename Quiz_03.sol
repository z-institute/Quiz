/**
 * SPDX-License-Identifier: UNLICENSED
 */
pragma solidity ^0.8.0;

import '@chainlink/contracts/src/v0.8/VRFConsumerBase.sol';

contract Quiz_03 is VRFConsumerBase {

  // update the following variables if you are not on Kovan testnet
  address _vrfCoordinator = 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9;
  address _linkToken = 0xa36085F69e2889c224210F603D836748e7dC0088;
  bytes32 _keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
  uint256 _fee = 0.1 * 10 * 10**18;

  uint256 public randomnessOutput;
  bytes32 public requestId;

  constructor()
    // solhint-disable-next-line no-empty-blocks
    VRFConsumerBase(_vrfCoordinator, _linkToken)
  {
    /* empty */
  }

  function fulfillRandomness(
    bytes32, /* requestId */
    uint256 randomness
  ) internal override {
    randomnessOutput = randomness;
    requestId = requestId;
  }

  function testRequestRandomness() external returns (bytes32) {
    require(LINK.balanceOf(address(this)) >= _fee, "Not enough LINK to pay fee");

    return requestRandomness(_keyHash, _fee);
  }
}
    
