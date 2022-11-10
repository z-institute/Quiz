const { expect } = require("chai");

describe("OPZ test", async function () {
    const [owner, acc1, acc2] = await ethers.getSigners();

    before(async function () {
        //console.log("before called");
        const OPZ = await ethers.getContractFactory("OPZ");
        opz = await OPZ.deploy(100, 200);
    });

    it("OPZ Name should be as expected", async function () {
        //expect(true).to.equal(true);
        expect(await opz.name()).to.equal("OPZ");
    });

    it("Should be able to mint to specific account with specific amount", async function () {
        const amount = 1;
        await opz.mint(acc1.address, amount);
        const acc1Balance = await opz.balanceOf(acc1.address);
        //console.log("acc1 balance: ", acc1Balance);
        expect(ethers.utils.formatUnits(acc1Balance, 0)).to.equal(
            amount.toString()
        );
    });

    it("Should be able to mint token with liquidity pool", async function () {
        const amount = 1;
        await opz.setLiquidityPool(acc1.address);
        await expect(opz.connect(acc1).mint(owner.address, amount)).not.to.be
            .reverted;
    });

    it("Should be able to mint token with risk valut", async function () {
        const amount = 1;
        await opz.setRiskVault(acc1.address);
        await expect(opz.connect(acc1).mint(owner.address, amount)).not.to.be
            .reverted;
    });

    it("Should not be able to mint token without qualified account", async function () {
        const amount = 1;
        //await opz.setRiskVault(acc1.address);
        await expect(opz.connect(acc2).mint(acc1.address, amount)).to.be
            .reverted;
    });

    it("should be able to pause", async function () {
        await opz.pause();
        expect(await opz.paused()).to.equal(true);
    });

    it("should be able to unpause", async function () {
        //await opz.pause();
        await opz.unpause();
        expect(await opz.paused()).to.equal(false);
    });

    it("should be able to run snapshot with owner", async function () {
        //await opz.pause();
        //expect(await opz.paused()).to.equal(true);
        await expect(opz.snapshot()).not.to.be.reverted;
    });

    describe("Events", function () {
        it("Should emit an event on setLiquidityPool", async function () {
            await expect(opz.setLiquidityPool(acc1.address))
                .to.emit(opz, "LiquidityPoolChanged")
                .withArgs(acc1.address);
        });

        it("Should emit an event on setRiskVault", async function () {
            await expect(opz.setRiskVault(acc1.address))
                .to.emit(opz, "RiskVaultChanged")
                .withArgs(acc1.address);
        });
    });
});
