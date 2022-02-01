import SecurePage from "@/ui/page/secure";
import ApproveDaiTransfer from "@/features/token/approve";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";

import Stepper from "@/ui/stepper";

const daiAbi = require("@/contracts/DaiMock.sol/abi.json");

export default function ApprovePage({}) {
  const { provider } = useWeb3();

  const daiContract = useContract({
    address: process.env.NEXT_PUBLIC_DAI_CONTRACT_ADDRESS,
    abi: daiAbi.abi,
    providerOrSigner: provider,
  });

  return (
    <SecurePage>
      <div className="flex items-center justify-center ">
        <Stepper steps={[{ label: "Approve" }, { label: "Buy" }]} index={0} />
      </div>
      <div class="mx-auto w-1/2 flex items-center justify-center bg-gray-800 p-8 rounded-2xl my-8">
        <ApproveDaiTransfer {...{ contract: daiContract, provider }} />
      </div>
    </SecurePage>
  );
}
