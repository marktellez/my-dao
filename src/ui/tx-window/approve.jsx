import { useState } from "react";

import TxWindow from "@/ui/tx-window";
import Spinner from "@/ui/page/spinner";
import EthAmountField from "@/ui/forms/eth-amount-field";
import { toWei } from "@/modules/units";
import ContractLinkText from "@/ui/contract-link/link";

export default function ApproveTransferFrom({
  contract,
  spender,
  provider,
  tokenSymbol,
  onConfirmation = () => {},
}) {
  const [amount, setAmount] = useState(0);
  const [busy, setBusy] = useState(false);

  async function handleTx() {
    return await contract
      .connect(provider.getSigner())
      .approve(spender, toWei(amount));
  }

  return (
    <div className="my-8">
      <div>
        <p>
          In order to transfer {amount} {tokenSymbol} from your wallet to our
          smart contract, you must first approve the amount we have access to.
        </p>

        <p>
          When Metamask opens, look under the "Edit Permission" link to verify
          the amount requested.
        </p>

        <ContractLinkText {...{ address: contract?.address }} />
      </div>

      <div className="my-16">
        <EthAmountField
          label={`Approve a transfer of ${amount} ${tokenSymbol}`}
          autoComplete="off"
          disabled={busy}
          value={amount}
          onChange={setAmount}
          onChange={(amount) => setAmount(amount ? amount : 0)}
        />
      </div>

      <TxWindow
        contract={contract}
        disabled={amount === 0 || busy}
        txHandler={handleTx}
        eventName={"Approval"}
        renderButtonText={() => (
          <div className="flex space-x-4 items-center justify-center">
            <div>Continue</div>
            <div>{busy && <Spinner />}</div>
          </div>
        )}
        onBusyChanged={(busy) => setBusy(busy)}
        onConfirmation={onConfirmation}
      />
    </div>
  );
}
