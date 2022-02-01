import TxWindow from "@/ui/tx-window";

import { toEth } from "@/modules/units";

export default function StakeApproved({ provider, contract, amount, onStake }) {
  async function handleTx() {
    return await contract.connect(provider.getSigner()).stake(amount);
  }

  function onStaked(owner, amount, event) {
    onStake(amount);
  }

  return (
    <>
      <TxWindow
        contract={contract}
        txHandler={handleTx}
        eventName={"Stake"}
        buttonText={`Stake ${toEth(amount)} tokens.`}
        onConfirmation={onStaked}
      />
    </>
  );
}
