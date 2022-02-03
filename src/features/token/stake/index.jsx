import { useRouter } from "next/router";

import ApproveTxWindow from "@/ui/tx-window/approve";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";

const daoAbi = require("@/contracts/DaoToken.sol/abi.json");

export default function StakeTokens({}) {
  const { provider, chainId } = useWeb3();
  const contracts = require("@/data/contracts.json")[chainId];

  const router = useRouter();

  const spender = contracts.staking.address;

  const contract = useContract({
    address: contracts.dao.address,
    abi: daoAbi.abi,
    providerOrSigner: provider,
  });

  function onApproved(owner, spender, amount, event) {
    router.push(`/token/stake/${amount}`);
  }
  return (
    <ApproveTxWindow
      contract={contract}
      spender={spender}
      provider={provider}
      tokenSymbol={"TZD"}
      renderButtonText={() => <span>Approve</span>}
      onConfirmation={(...rest) => onApproved(...rest)}
    />
  );
}
