import SecurePage from "@/ui/page/secure";
import BuyRewardToken from "@/features/token/buy";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";

import Stepper from "@/ui/stepper";

const marketAbi = require("@/contracts/Market.sol/abi.json");

export default function BuyPage({}) {
  const { provider } = useWeb3();

  const marketContract = useContract({
    address: process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS,
    abi: marketAbi.abi,
    providerOrSigner: provider,
  });

  return (
    <SecurePage>
      <div className="flex items-center justify-center ">
        <Stepper steps={[{ label: "Approve" }, { label: "Buy" }]} index={1} />
      </div>
      <BuyRewardToken {...{ contract: marketContract, provider }} />
    </SecurePage>
  );
}
