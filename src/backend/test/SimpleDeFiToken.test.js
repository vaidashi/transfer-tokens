const { expect } = require("chai");
const { ethers } = require("hardhat");
const { toWei, fromWei } = require("./Utils");

describe("SimpleDeFiToken", () => {
    let deployer, addr1, addr2, token;

    beforeEach(async () => {
        [deployer, addr1, addr2] = await ethers.getSigners();
        const tokenContractFactory = await ethers.getContractFactory("SimpleDeFiToken");
        token = await tokenContractFactory.deploy();
    });

    it("should deploy the contract", async () => {
        expect(token.address).to.not.be.null;
    });

    it("should have a name, symbol, and total supply", async () => {
        expect(await token.name()).to.equal("Simple DeFi Token");
        expect(await token.symbol()).to.equal("SDFT");
        expect(await token.totalSupply()).to.equal(toWei(1000000));    
    });

    it("should transfer tokens between accounts", async () => {
        expect(await token.balanceOf(deployer.address)).to.equal(toWei(1000000));
        await token.connect(deployer).transfer(addr1.address, toWei(5));
        
        expect(await token.balanceOf(addr1.address)).to.equal(toWei(5));
        expect(await token.balanceOf(deployer.address)).to.equal(toWei(999995));
    });

    it("Should revert when transfer amount exceeds balance", async () => {
        await expect(token.connect(addr1).transfer(addr2.address, toWei(10))).to.be.reverted;
    });

    it("Should burn token automatically when calling transferWithAutoBurn", async () => {
        await token.connect(deployer).transfer(addr1.address, toWei(1));
        await token.connect(addr1).transferWithAutoBurn(addr2.address, toWei(1));
    });
});