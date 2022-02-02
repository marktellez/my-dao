import { useRouter } from "next/router";

import SecurePage from "@/ui/page/secure";
import BuyRewardToken from "@/features/token/buy/transfer";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";

import Stepper from "@/ui/stepper";

const marketAbi = require("@/contracts/Market.sol/abi.json");

export default function BuyPage({}) {
  const { provider } = useWeb3();
  const router = useRouter();

  const marketContract = useContract({
    address: process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS,
    abi: marketAbi.abi,
    providerOrSigner: provider,
  });

  function onBuy(amount) {
    router.push("/dashboard");
  }

  return (
    <SecurePage>
      <Stepper
        steps={[
          { label: "Approve", link: "/token/buy" },
          {
            label: "Buy",
          },
        ]}
        index={1}
      />
      <BuyRewardToken {...{ contract: marketContract, provider, onBuy }} />
    </SecurePage>
  );
}
