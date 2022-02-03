import { useRouter } from "next/router";

import ApproveTxWindow from "@/ui/tx-window/approve";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";

const daiAbi = require("@/contracts/DaiMock.sol/abi.json");

export default function BuyTokens({}) {
  const { provider, chainId } = useWeb3();
  const contracts = require("@/data/contracts.json")[chainId];

  const router = useRouter();

  const spender = contracts.market.address;

  const daiContract = useContract({
    address: contracts.dai.address,
    abi: daiAbi.abi,
    providerOrSigner: provider,
  });

  function onApproved(owner, spender, amount, event) {
    router.push(`/token/buy/${amount}`);
  }

  return (
    <ApproveTxWindow
      contract={daiContract}
      spender={spender}
      provider={provider}
      tokenSymbol={contracts.dai.symbol}
      renderButtonText={() => <span>Approve</span>}
      onConfirmation={(...rest) => onApproved(...rest)}
    />
  );
}
