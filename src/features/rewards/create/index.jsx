import { useState } from "react";

import TxWindow from "@/ui/tx-window";

import EthAddressField from "@/ui/forms/eth-address-field";
import EthAmountField from "@/ui/forms/eth-amount-field";

import { toWei } from "@/modules/units";

export default function CreateReward({ contract, provider, onReward }) {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("0.01");
  const [valid, setValid] = useState({
    address: false,
    amount: false,
  });

  const [errors, setErrors] = useState({
    address: false,
    amount: false,
  });

  function formIsValid() {
    return Object.keys(valid).every((key) => valid[key]);
  }

  async function handleTx() {
    return await contract
      .connect(provider.getSigner())
      .reward(address, toWei(amount));
  }

  function onRewarded(owner, spender, amount, event) {
    setAddress("");
    setAmount("0.01");
    onReward(amount);
  }

  function validate(key, truth, error) {
    valid[key] = truth;
    setErrors((prev) => ({
      ...prev,
      [key]: !truth ? error : "",
    }));
  }

  return (
    <div className="my-12">
      <div className="w-[420px] my-8">
        <EthAddressField
          autoComplete="off"
          value={address}
          onChange={(address) => {
            setAddress(address);
            validate("address", address.length === 42, "Invalid address");
          }}
          onBlur={() =>
            validate("address", address.length === 42, "Invalid address")
          }
        />
        {errors.address && <div className="text-red-400">{errors.address}</div>}
      </div>

      <div className="w-[200px] my-8">
        <EthAmountField
          label="Reward Token"
          autoComplete="off"
          value={amount}
          onChange={(amount) => {
            setAmount(amount);
            validate("amount", amount.length > 0, "Required value");
          }}
          onBlur={() => validate("amount", amount.length > 0, "Required value")}
        />
        {errors.amount && <div className="text-red-400">{errors.amount}</div>}
      </div>

      <TxWindow
        disabled={!formIsValid()}
        contract={contract}
        txHandler={handleTx}
        eventName={"Reward"}
        buttonText={`Give a reward of ${amount} tokens.`}
        onConfirmation={onRewarded}
      />
    </div>
  );
}
