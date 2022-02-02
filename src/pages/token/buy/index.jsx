import { useRouter } from "next/router";

import SecurePage from "@/ui/page/secure";
import BuyTokens from "@/features/token/buy";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";

import Stepper from "@/ui/stepper";

const daiAbi = require("@/contracts/DaiMock.sol/abi.json");

export default function ApproveDaiBuyPage({}) {
  const { provider } = useWeb3();
  const router = useRouter();

  const daiContract = useContract({
    address: process.env.NEXT_PUBLIC_DAI_CONTRACT_ADDRESS,
    abi: daiAbi.abi,
    providerOrSigner: provider,
  });

  function onApproved(amount) {
    router.push(`/token/buy/${amount}`);
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
        index={0}
      />
      <div className="mx-auto w-1/2 flex items-center justify-center bg-gray-800 p-8 rounded-2xl my-8">
        <BuyTokens {...{ contract: daiContract, provider, onApproved }} />
      </div>
    </SecurePage>
  );
}
