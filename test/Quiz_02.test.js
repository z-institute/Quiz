// 1. Copy sample code from https://hardhat.org/tutorial/testing-contracts.html
// 2. Install ethers plugin: https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html
// 3. Add the tests and run `npx hardhat test`
// 4. Install coverage plugin: https://www.npmjs.com/package/solidity-coverage
// 5. Run `npx hardhat coverage`

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Quiz 2 test", async function () {
  const [owner, acc1, acc2] = await ethers.getSigners();
  let token;

  before(async function () {
    const MyToken = await ethers.getContractFactory("MyToken");
    token = await MyToken.deploy();
    // console.log(token.functions);
  });

  it("Name should be as expected", async function () {
    // const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.name()).to.equal("MyToken");
  });
  it("Should be able to mint to specific account", async function () {
    await token.mint(owner.address, 0, {
      value: ethers.utils.parseEther("0.1"),
    });
    // console.log(await token.ownerOf(0));
    expect(await token.ownerOf(0)).to.equal(owner.address);

    await token.batchMint(acc1.address, [1, 2], {
      value: ethers.utils.parseEther("0.2"),
    });

    // console.log(await token.ownerOf(0));
    expect(await token.ownerOf(1)).to.equal(acc1.address);
    expect(await token.ownerOf(2)).to.equal(acc1.address);
  });
});
