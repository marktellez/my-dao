import { ethers } from "ethers";

export function toEth(value) {
  return ethers.utils.formatEther(value.toString());
}

export function toWei(value) {
  return ethers.utils.parseEther(value.toString());
}
