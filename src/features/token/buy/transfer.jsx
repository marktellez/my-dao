import { useRouter } from "next/router";

import TxWindow from "@/ui/tx-window";

import { toEth } from "@/modules/units";

export default function SwapTokens({ contract, provider, onBuy }) {
  const router = useRouter();
  const { amount } = router.query;

  async function handleTx() {
    return await contract
      .connect(provider.getSigner())
      .swapStableForToken(amount);
  }

  return (
    <div className="mx-auto w-1/2 flex items-center justify-center bg-gray-800 p-8 rounded-2xl my-8">
      <div className="my-8">
        <div className="mb-16">
          <p>
            You have approved a transfer of {toEth(amount)}{" "}
            {process.env.NEXT_PUBLIC_STABLE_SYMBOL}. We will give you a{" "}
            {toEth(amount)} {process.env.NEXT_PUBLIC_TOKEN_SYMBOL} for it and
            you can stake or withdraw whenever you like.
          </p>
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
    </div>
  );
}
