import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useInterval } from "usehooks-ts";

import SecurePage from "@/ui/page/secure";
import Paper from "@/ui/paper";
import RewardSummary from "@/features/rewards/summary";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";

const tokenAbi = require("@/contracts/RewardToken.sol/abi.json");
const stakingAbi = require("@/contracts/RewardTokenStaking.sol/abi.json");

import OutlineButton from "@/ui/buttons/outline";

export default function MyRewardsPage({}) {
  const [availableRewards, setAvailableRewards] = useState(0);
  const [yourStaked, setYourStaked] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);

  const { address, provider } = useWeb3();

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

  const router = useRouter();

  useInterval(
    async () => setTotalEarned(await stakingContract.earned(address)),
    5000
  );

  useEffect(async () => {
    if (!tokenContract || !address) return;

    setAvailableRewards(await tokenContract.balanceOf(address));
  }, [tokenContract, address]);

  useEffect(async () => {
    if (!stakingContract || !address) return;

    setTotalStaked(await stakingContract.stakedSupply());
    setYourStaked(await stakingContract.balanceOf(address));
    setTotalEarned(await stakingContract.earned(address));
  }, [stakingContract, address]);

  return (
    <SecurePage>
      <Paper>
        <h1 className="text-center">Your Rewards</h1>

        <RewardSummary
          {...{ totalEarned, availableRewards, totalStaked, yourStaked }}
        />

        <div className="flex items-center space-x-4 my-4">
          <OutlineButton
            block
            disabled={Number(availableRewards) <= 0}
            onClick={() => router.push("/rewards/approve")}>
            Stake
          </OutlineButton>
          <OutlineButton
            block
            disabled={Number(yourStaked) <= 0}
            onClick={() => router.push("/rewards/withdraw")}>
            Withdraw
          </OutlineButton>
        </div>
      </Paper>
    </SecurePage>
  );
}
