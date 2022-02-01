import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PrimaryButton, SecondaryButton } from "@/ui/buttons";
import Paper from "@/ui/paper";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";

import { toEth } from "@/modules/units";

const tokenAbi = require("@/contracts/RewardToken.sol/abi.json");
const stakingAbi = require("@/contracts/RewardTokenStaking.sol/abi.json");

export default function Dashboard({}) {
  const [circulatingSupply, setCirculatingSupply] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);

  const { address, provider } = useWeb3();
  const router = useRouter();

  const stakingContract = useContract({
    address: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
    abi: stakingAbi.abi,
    providerOrSigner: provider,
  });

  const tokenContract = useContract({
    address: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS,
    abi: tokenAbi.abi,
    providerOrSigner: provider,
  });

  useEffect(async () => {
    if (!tokenContract || !address) return;

    setCirculatingSupply(await tokenContract.circulatingSupply());
  }, [tokenContract, address]);

  useEffect(async () => {
    if (!stakingContract || !address) return;

    setTotalStaked(await stakingContract.totalStaked());
  }, [stakingContract, address]);

  return (
    <Paper className="w-full">
      <h1>Dashboard</h1>

      <div className="border border-white p-8">
        <h2>DAO Stats</h2>

        <div>Circulating Supply: {toEth(circulatingSupply)}</div>
        <div>Total Staked: {toEth(totalStaked)}</div>
      </div>

      <div className="flex space-x-8 w-full my-8">
        <PrimaryButton block onClick={() => router.push("/token/approve")}>
          Buy {process.env.NEXT_PUBLIC_TOKEN_SYMBOL} tokens
        </PrimaryButton>
        <SecondaryButton block>Get Started</SecondaryButton>
      </div>
    </Paper>
  );
}
