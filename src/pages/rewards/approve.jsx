import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import SecurePage from "@/ui/page/secure";
import Paper from "@/ui/paper";
import ApproveStake from "@/features/rewards/stake/approve";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";

const tokenAbi = require("@/contracts/RewardToken.sol/abi.json");

export default function MyRewardsPage({}) {
  const [availableRewards, setAvailableRewards] = useState(0);

  const { address, provider } = useWeb3();

  const contract = useContract({
    address: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS,
    abi: tokenAbi.abi,
    providerOrSigner: provider,
  });

  const router = useRouter();

  useEffect(async () => {
    if (!contract || !address) return;

    setAvailableRewards(await contract.balanceOf(address));
  }, [contract, address]);

  function onApproved(amount) {
    router.push(`/rewards/stake/${amount}`);
  }

  return (
    <SecurePage>
      <Paper>
        <h1 className="text-center">Approve Amount</h1>

        {Number(availableRewards) > 0 && (
          <ApproveStake
            {...{
              provider,
              address,
              contract: contract,
              available: availableRewards,
            }}
            onApproved={onApproved}
          />
        )}
      </Paper>
    </SecurePage>
  );
}
