import { ethers } from "ethers";

export function toEth(value, decimals = 3) {
  return parseFloat(ethers.utils.formatEther(value.toString()))
    .toFixed(decimals)
    .toString()
    .replace(/[\.]?[0]+$/, "");
}

export function toWei(value) {
  return ethers.utils.parseEther(value.toString());
}
