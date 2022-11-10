// 1. Copy sample code from https://hardhat.org/tutorial/testing-contracts.html
// 2. Install ethers plugin: https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html
// 3. Add the tests and run `npx hardhat test`
// 4. Install coverage plugin: https://www.npmjs.com/package/solidity-coverage
// 5. Run `npx hardhat coverage`
// 6. When testing revert, fix errors in https://github.com/OpenZeppelin/openzeppelin-test-helpers/issues/155#issuecomment-886127598

const { expect } = require("chai");

describe("OPZ Test", async function () {
    const [owner, newLiquidityPool, newRiskVault , acc1] = await ethers.getSigners();
    let initialSupply = '0'; // 0
    let cap = '100'; // 10000 * 1e18
    let Token;
    let hardhatToken;
    let testAddr = "0xfc7E86cfc079D0588A2a537c39Bca2864500088F";

    before(async function () {
        // deploy contract
        Token = await ethers.getContractFactory("OPZ");
        hardhatToken = await Token.deploy(initialSupply,cap);
    });
    describe("Deployment", function () {
        it("Name should be as expected", async function () {
            //expect(true).to.equal(true);
            expect(await hardhatToken.name()).to.equal("OPZ");
        });
        it("Should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });
    describe("onlyMinter", function () {
        it("owner can mint the token", async function () {
            const amount = 1;
            await hardhatToken.setLiquidityPool(owner.address);
            await expect(hardhatToken.connect(owner).mint(owner.address, amount)).not.to.be
                .reverted;
        });
        it("liquidity pool can mint the token", async function () {
            const amount = 1;
            await hardhatToken.setLiquidityPool(newLiquidityPool.address);
            await expect(hardhatToken.connect(newLiquidityPool).mint(newLiquidityPool.address, amount)).not.to.be
                .reverted;
        });
        it("risk vault can mint the token", async function () {
            const amount = 1;
            await hardhatToken.setLiquidityPool(newRiskVault.address);
            await expect(hardhatToken.connect(newRiskVault).mint(newRiskVault.address, amount)).not.to.be
                .reverted;
        });
    });
    describe("Set Function", function () {
        it("setLiquidityPool Success", async function () {
            await hardhatToken.setLiquidityPool(newLiquidityPool.address);
            expect(await hardhatToken.liquidityPoolAddr()).to.equal(newLiquidityPool.address);
        });
        it("setRiskVault Success", async function () {
            await hardhatToken.setRiskVault(newRiskVault.address);
            expect(await hardhatToken.riskVaultAddr()).to.equal(newRiskVault.address);
        });
    });
    describe("Action", function () {
        it("setPause Success", async function () {
            await hardhatToken.pause();
            expect(await hardhatToken.paused()).to.equal(true);
        });
        it("setUnPause Success", async function () {
            await hardhatToken.unpause();
            expect(await hardhatToken.paused()).to.equal(false);
        });
        it("Snapshot Success", async function () {
            await expect(hardhatToken.snapshot()).not.to.be.reverted;
        });
    });
    describe("Mint", function () {
        it("Should be able to mint to specific account with specific amount", async function () {
            const amount = 1;
            await hardhatToken.mint(testAddr, amount);
            const blanceOfTestAddr = await hardhatToken.balanceOf(testAddr);
            expect(ethers.utils.formatUnits(blanceOfTestAddr, 0)).to.equal( amount.toString());
        });
        it("Only owner, liquidity pool, and risk vault can mint the token", async function () {
            const amount = 1;
            expect( await hardhatToken.connect(acc1).mint(acc1.address, amount)).to.be.revertedWith(
                "Only owner, liquidity pool, and risk vault can mint the token"
                );
        });
    });
});