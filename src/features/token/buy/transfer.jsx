import { useRouter } from "next/router";

import TxWindow from "@/ui/tx-window";
import Token from "@/ui/token";
import ProTip from "@/ui/pro-tip";
import ContractLinkText from "@/ui/contract-link/link";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";

import { toEth } from "@/modules/units";

const marketAbi = require("@/contracts/Market.sol/abi.json");

export default function SwapTokens({}) {
  const { provider, chainId } = useWeb3();
  const contracts = require("@/data/contracts.json")[chainId];

  const router = useRouter();
  const { amount } = router.query;

  const contract = useContract({
    address: contracts.market.address,
    abi: marketAbi.abi,
    providerOrSigner: provider,
  });

  function onBuy(amount) {
    router.push("/dashboard");
  }

  async function handleTx() {
    return await contract.connect(provider.getSigner()).swapERCForDao(amount);
  }

  return (
    <>
      <div className="my-8">
        <div className="mb-16">
          <p className="font-bold">
            You have approved a transfer of {toEth(amount)}{" "}
            <Token {...{ name: "DAI" }} />. For it you will recieve{" "}
            {toEth(amount)} <Token {...{ name: "TZD" }} />.
          </p>

          <ProTip>
            Note: The transaction will be confirmed, but the token won't
            immediately show in your balance. This is because that is a seperate
            transaction on the chain. Your new <Token {...{ name: "TZD" }} />{" "}
            will appear shortly.
          </ProTip>

          <ProTip text="You can view the source for this contract!">
            <ContractLinkText {...{ address: contract?.address }} />
          </ProTip>
        </div>

        <TxWindow
          contract={contract}
          disabled={amount === 0}
          txHandler={handleTx}
          eventName={"Buy"}
          renderButtonText={() => <span>Buy now</span>}
          onConfirmation={(owner, amount, event) => onBuy(amount)}
        />
      </div>
    </>
  );
}
