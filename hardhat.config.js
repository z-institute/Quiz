/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers");
require("solidity-coverage");
const chai = require("chai");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);

module.exports = {
  solidity: "0.8.15",
};
