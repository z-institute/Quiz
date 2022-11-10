const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OPZ", async function () {
  const [owner, acc1, acc2, acc3] = await ethers.getSigners();
  let opz;

  beforeEach(async function () {
    const OPZ = await ethers.getContractFactory("Quiz_04");
    opz = await OPZ.deploy(100, 500);
  });

  it("Should be able to mint to specific account", async function () {
    await opz.mint(owner.address, 100);
    expect(await opz.balanceOf(owner.address)).to.equal(200);
  });

  it("Should not be able to mint to specific account", async function () {
    expect(opz.mint(owner.address, 401)).to.be.revertedWith(
      "ERC20Capped: cap exceeded"
    );
  });

  it("Should be able to pause and unpause", async function () {
    await opz.pause();
    expect(await opz.paused()).to.equal(true);
    await opz.unpause();
    expect(await opz.paused()).to.equal(false);
  });

  it("Should not be able to pause and unpause", async function () {
    expect(opz.connect(acc3).pause()).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );

    expect(opz.connect(acc3).unpause()).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });

  it("Should be able to pause then cannot mint", async function () {
    await opz.pause();
    expect(opz.mint(owner.address, 400)).to.be.revertedWith("Pausable: paused");
  });

  it("Should be able to setLiquidityPool", async function () {
    await opz.setLiquidityPool(acc1.address);
    expect(await opz.liquidityPoolAddr()).to.equal(acc1.address);
  });

  it("Should not be able to setLiquidityPool", async function () {
    expect(opz.connect(acc3).setLiquidityPool(acc1.address)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });

  it("Should be able to setRiskVault", async function () {
    await opz.setRiskVault(acc2.address);
    expect(await opz.riskVaultAddr()).to.equal(acc2.address);
  });

  it("Should not be able to setRiskVault", async function () {
    expect(opz.connect(acc3).setRiskVault(acc2.address)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });

  it("Should be able to snapshot", async function () {
    await opz.snapshot();
  });

  it("Should not be able to snapshot", async function () {
    expect(opz.connect(acc3).snapshot()).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });

  it("Should be able to mint by liquidityPoolAddr", async function () {
    await opz.setLiquidityPool(acc1.address);
    await opz.mint(acc1.address, 100);
    expect(await opz.balanceOf(acc1.address)).to.equal(100);
  });

  it("Should not be able to mint not owner, liquidity pool, and risk vault", async function () {
    await opz.setLiquidityPool(acc1.address);
    await opz.setRiskVault(acc2.address);

    expect(opz.connect(acc3).mint(acc3.address, 100)).to.be.revertedWith(
      "Only owner, liquidity pool, and risk vault can mint the token"
    );
  });

  it("Should be able to mint by LiquidityPool", async function () {
    await opz.setLiquidityPool(acc1.address);
    await opz.connect(acc1).mint(acc1.address, 100);
    expect(await opz.balanceOf(acc1.address)).to.equal(100);
  });

  it("Should be able to mint by RiskVault", async function () {
    await opz.setRiskVault(acc2.address);
    await opz.connect(acc2).mint(acc2.address, 100);
    expect(await opz.balanceOf(acc2.address)).to.equal(100);
  });
});
