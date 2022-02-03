import { useRouter } from "next/router";

import TxWindow from "@/ui/tx-window";
import ContractLinkText from "@/ui/contract-link/link";
import Token from "@/ui/token";
import ProTip from "@/ui/pro-tip";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";

import { toEth } from "@/modules/units";

const stakingAbi = require("@/contracts/DaoStaking.sol/abi.json");

export default function TransferStakedTokens({}) {
  const { provider, chainId } = useWeb3();
  const contracts = require("@/data/contracts.json")[chainId];

  const router = useRouter();
  const { amount } = router.query;

  const contract = useContract({
    address: contracts.staking.address,
    abi: stakingAbi.abi,
    providerOrSigner: provider,
  });

  function onStake(amount) {
    router.push("/dashboard");
  }

  async function handleTx() {
    return await contract.connect(provider.getSigner()).stake(amount);
  }

  return (
    <>
      <div className="my-8">
        <p className="font-bold">
          We can now stake your {toEth(amount)} <Token {...{ name: "TZD" }} />!
        </p>
      </div>

      <ProTip title="View the code for this contract">
        <ContractLinkText {...{ address: contract?.address }} />
      </ProTip>

      <TxWindow
        contract={contract}
        disabled={amount === 0}
        txHandler={handleTx}
        eventName={"Stake"}
        renderButtonText={() => <span>Stake now</span>}
        onConfirmation={(owner, amount, event) => onStake(amount)}
      />
    </>
  );
}
