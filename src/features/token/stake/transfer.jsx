import TxWindow from "@/ui/tx-window";
import ContractLinkText from "@/ui/contract-link/link";
import { toEth } from "@/modules/units";

export default function TransferStakedTokens({
  contract,
  provider,
  amount,
  onStake,
}) {
  async function handleTx() {
    return await contract.connect(provider.getSigner()).stake(amount);
  }

  return (
    <div>
      <div className="my-8">
        <p>
          You have approved a transfer of {toEth(amount)}{" "}
          {process.env.NEXT_PUBLIC_STABLE_SYMBOL} to our smart contract. We can
          now stake your {toEth(amount)} {process.env.NEXT_PUBLIC_TOKEN_SYMBOL}!
        </p>

        <ContractLinkText {...{ address: contract?.address }} />
      </div>

      <TxWindow
        contract={contract}
        disabled={amount === 0}
        txHandler={handleTx}
        eventName={"Stake"}
        renderButtonText={() => <span>Buy now</span>}
        onConfirmation={(owner, amount, event) => onStake(amount)}
      />
    </div>
  );
}
