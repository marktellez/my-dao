import { useState } from "react";
import { useRouter } from "next/router";

import TxWindow from "@/ui/tx-window";
import Spinner from "@/ui/page/spinner";
import EthAmountField from "@/ui/forms/eth-amount-field";
import { toWei } from "@/modules/units";

export default function ApproveDai({ contract, provider }) {
  const [amount, setAmount] = useState(0);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function handleTx() {
    return await contract
      .connect(provider.getSigner())
      .approve(process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS, toWei(amount));
  }

  return (
    <div className="my-8">
      <div>
        <p>
          In order to transfer {amount} {process.env.NEXT_PUBLIC_STABLE_SYMBOL}{" "}
          from your wallet to our smart contract, you must first approve the
          amount we have access to. When Metamask opens, look under the "Edit
          Permission" link.
        </p>
      </div>

      <div className="my-16">
        <EthAmountField
          label={`Buy ${amount} ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL}`}
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
            <div>
              Approve a transfer of {amount}{" "}
              {process.env.NEXT_PUBLIC_STABLE_SYMBOL}
            </div>
            <div>{busy && <Spinner />}</div>
          </div>
        )}
        onStart={() => setBusy(true)}
        onError={() => setBusy(false)}
        onConfirmation={(owner, spender, amount, event) =>
          router.push(`/token/buy/${amount}`)
        }
      />
    </div>
  );
}
