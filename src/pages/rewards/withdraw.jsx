import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import SecurePage from "@/ui/page/secure";
import Paper from "@/ui/paper";
import WithdrawStake from "@/features/rewards/stake/withdraw";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";

const tokenAbi = require("@/contracts/RewardToken.sol/abi.json");
const stakingAbi = require("@/contracts/RewardTokenStaking.sol/abi.json");

export default function MyRewardsPage({}) {
  const [availableRewards, setAvailableRewards] = useState(0);
  const [yourStaked, setYourStaked] = useState(0);

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

  useEffect(async () => {
    if (!tokenContract || !address) return;

    setAvailableRewards(await tokenContract.balanceOf(address));
  }, [tokenContract, address]);

  useEffect(async () => {
    if (!stakingContract || !address) return;

    setYourStaked(await stakingContract.balanceOf(address));
  }, [stakingContract, address]);

  function onWithdrawn() {
    router.push(`/rewards`);
  }

  return (
    <SecurePage>
      <Paper>
        <h1 className="text-center">Withdraw Stake</h1>

        <div>Interest earned:</div>

        {Number(yourStaked) > 0 && (
          <WithdrawStake
            {...{
              provider,
              address,
              contract: stakingContract,
              available: yourStaked,
            }}
            onWithdrawn={onWithdrawn}
          />
        )}
      </Paper>
    </SecurePage>
  );
}
