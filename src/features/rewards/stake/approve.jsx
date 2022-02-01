import { useState } from "react";

import TxWindow from "@/ui/tx-window";

import { toEth, toWei } from "@/modules/units";

import EthAmountField from "@/ui/forms/eth-amount-field";

export default function ApproveStake({
  provider,
  available,
  contract,
  onApproved,
}) {
  const [amount, setAmount] = useState(toEth(available));
  const [busy, setBusy] = useState(false);

  const [valid, setValid] = useState({
    amount: true,
  });

  const [errors, setErrors] = useState({
    amount: false,
  });

  function validate(key, truth, error) {
    valid[key] = truth;
    setErrors((prev) => ({
      ...prev,
      [key]: !truth ? error : "",
    }));
  }

  function formIsValid() {
    return Object.keys(valid).every((key) => valid[key]);
  }

  async function handleTx() {
    return await contract
      .connect(provider.getSigner())
      .approve(process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS, toWei(amount));
  }

  function onApprove(owner, spender, amount, event) {
    onApproved(amount);
  }

  return (
    <>
      <div className="my-8">
        <EthAmountField
          label="Amount to stake"
          disabled={busy}
          autoComplete="off"
          value={amount}
          onChange={setAmount}
          onChange={(amount) => {
            setAmount(amount);
            validate("amount", amount.length > 0, "Required value");
          }}
          onBlur={() => validate("amount", amount.length > 0, "Required value")}
        />
      </div>

      <TxWindow
        disabled={!formIsValid()}
        contract={contract}
        txHandler={handleTx}
        eventName={"Approval"}
        buttonText={`I want to stake ${amount} tokens.`}
        onConfirmation={onApprove}
        onBusyChanged={(busy) => setBusy(busy)}
      />
    </>
  );
}
