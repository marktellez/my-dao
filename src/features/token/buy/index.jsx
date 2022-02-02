import ApproveTxWindow from "@/ui/tx-window/approve";

export default function BuyTokens({ contract, provider, onApproved }) {
  return (
    <ApproveTxWindow
      contract={contract}
      spender={process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS}
      provider={provider}
      tokenSymbol={process.env.NEXT_PUBLIC_STABLE_SYMBOL}
      renderButtonText={() => <span>Approve</span>}
      onConfirmation={(owner, spender, amount, event) => onApproved(amount)}
    />
  );
}
