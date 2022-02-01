import { ethers, ContractFactory } from "ethers";

const abi = require("@/contracts/RewardToken.sol/abi.json");
const bytecode = require("@/contracts/RewardToken.sol/bytecode.json");

const provider = new ethers.providers.InfuraProvider("maticmum", {
  projectId: process.env.INFURA_PROJECT_ID,
  projectSecret: process.env.INFURA_PROJECT_SECRET,
});

const wallet = new ethers.Wallet(process.env.PLATFORM_PRIVATE_KEY, provider);

const factory = new ContractFactory(abi, bytecode, wallet);

export async function createReward({ address, amount }) {
  const contract = await factory.deploy(process.env.NEXT_PUBLIC_TOTAL_SUPPLY);

  return await contract.reward(address, amount);
}

export default async function createRewardApi(req, res) {
  res.json(await createReward(JSON.parse(req.body)));
}
