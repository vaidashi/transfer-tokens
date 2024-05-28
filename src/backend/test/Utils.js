const { ethers } = require("hardhat");
const toWei = (num) => ethers.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);
exports.toWei = toWei;
exports.fromWei = fromWei;