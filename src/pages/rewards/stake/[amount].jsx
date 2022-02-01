import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import SecurePage from "@/ui/page/secure";
import Paper from "@/ui/paper";

import StakeApproved from "@/features/rewards/stake";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";

const tokenAbi = require("@/contracts/RewardToken.sol/abi.json");
const stakingAbi = require("@/contracts/RewardTokenStaking.sol/abi.json");

export default function StakeMyRewardsPage({}) {
  const [availableRewards, setAvailableRewards] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);

  const router = useRouter();
  const amount = router.query.amount;

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

  useEffect(async () => {
    if (!tokenContract || !address) return;

    setAvailableRewards(await tokenContract.balanceOf(address));
  }, [tokenContract, address]);

  useEffect(async () => {
    if (!stakingContract || !address) return;

    setTotalStaked(await stakingContract.balanceOf(address));
  }, [stakingContract]);

  function onStake() {
    router.push("/rewards");
  }

  return (
    <SecurePage>
      <Paper className="w-1/2">
        <h1>Staking tokens</h1>

        <StakeApproved
          {...{
            provider,
            contract: stakingContract,
            amount,
            onStake,
          }}
        />
      </Paper>
    </SecurePage>
  );
}
