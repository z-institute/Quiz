// https://hardhat.org/tutorial/testing-contracts.html

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
