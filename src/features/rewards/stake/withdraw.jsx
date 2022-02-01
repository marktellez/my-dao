import { useState } from "react";

import TxWindow from "@/ui/tx-window";

import { toEth, toWei } from "@/modules/units";

import EthAmountField from "@/ui/forms/eth-amount-field";

export default function ApproveStake({
  provider,
  available,
  contract,
  onWithdrawn,
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
    return await contract.connect(provider.getSigner()).withdraw(toWei(amount));
  }

  function onWithdraw(owner, spender, amount, event) {
    onWithdrawn(amount);
  }

  return (
    <>
      <div className="mb-10 mt-16">
        <EthAmountField
          label="Amount to unstake"
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
        eventName={"Withdraw"}
        buttonText={`Withdraw ${amount} tokens from my stake`}
        onConfirmation={onWithdraw}
        onBusyChanged={(busy) => setBusy(busy)}
      />
    </>
  );
}
