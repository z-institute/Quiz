// 1. Copy sample code from https://hardhat.org/tutorial/testing-contracts.html
// 2. Install ethers plugin: https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html
// 3. Add the tests and run `npx hardhat test`
// 4. Install coverage plugin: https://www.npmjs.com/package/solidity-coverage
// 5. Run `npx hardhat coverage`

const { expect } = require("chai");

describe("Quiz 2 test", function () {
  it("test", async function () {
    const [owner] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");

    const token = await MyToken.deploy();

    // console.log(token.functions);

    // const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.name()).to.equal("MyToken");
  });
});
