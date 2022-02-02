import ApproveTxWindow from "@/ui/tx-window/approve";

export default function StakeTokens({ contract, provider, onApproved }) {
  return (
    <ApproveTxWindow
      contract={contract}
      spender={process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS}
      provider={provider}
      tokenSymbol={process.env.NEXT_PUBLIC_TOKEN_SYMBOL}
      renderButtonText={() => <span>Approve </span>}
      onConfirmation={(owner, spender, amount, event) => onApproved(amount)}
    />
  );
}
