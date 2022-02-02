import { useRouter } from "next/router";

import SecurePage from "@/ui/page/secure";
import StakeToken from "@/features/token/stake/transfer";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";

import Stepper from "@/ui/stepper";

const stakingAbi = require("@/contracts/RewardTokenStaking.sol/abi.json");

export default function StakeTokenPage({}) {
  const { provider } = useWeb3();
  const router = useRouter();
  const { amount } = router.query;

  const stakingContract = useContract({
    address: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
    abi: stakingAbi.abi,
    providerOrSigner: provider,
  });

  function onStake(amount) {
    router.push("/dashboard");
  }

  return (
    <SecurePage>
      <Stepper
        steps={[
          { label: "Approve", link: "/token/stake" },
          {
            label: "Stake",
            link: `/token/stake/${amount}`,
          },
        ]}
        index={1}
      />

      <div className="mx-auto w-1/2 flex items-center justify-center bg-gray-800 p-8 rounded-2xl my-8">
        <StakeToken
          {...{
            contract: stakingContract,
            provider,
            amount,
            onStake,
          }}
        />
      </div>
    </SecurePage>
  );
}
