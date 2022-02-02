import { useRouter } from "next/router";

import SecurePage from "@/ui/page/secure";
import ApproveTransfer from "@/features/token/stake";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";

import Stepper from "@/ui/stepper";

const tokenAbi = require("@/contracts/RewardToken.sol/abi.json");

export default function ApproveTokenStakePage({}) {
  const { provider } = useWeb3();
  const router = useRouter();

  const tokenContract = useContract({
    address: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS,
    abi: tokenAbi.abi,
    providerOrSigner: provider,
  });

  function onApproved(amount) {
    router.push(`/token/stake/${amount}`);
  }

  return (
    <SecurePage>
      <Stepper
        steps={[
          { label: "Approve", link: "/token/stake" },
          {
            label: "Stake",
          },
        ]}
        index={0}
      />

      <div className="mx-auto w-1/2 flex items-center justify-center bg-gray-800 p-8 rounded-2xl my-8">
        <ApproveTransfer
          {...{ contract: tokenContract, provider, onApproved }}
        />
      </div>
    </SecurePage>
  );
}
