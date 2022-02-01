import { useState } from "react";
import { useRouter } from "next/router";

import TxWindow from "@/ui/tx-window";

import { toWei, toEth } from "@/modules/units";

export default function BuyToken({ contract, provider, onBuy }) {
  const router = useRouter();
  const { amount } = router.query;

  async function handleTx() {
    return await contract
      .connect(provider.getSigner())
      .swapStableForToken(amount);
  }

  function onBuy(amount) {
    const message = `Awesome! You are now the proud owner of ${amount} ${process.env.NEXT_PUBLIC_TOKEN_NAME} "shares"`;
    router.push(`/dashboard?message=${encodeURIComponent(message)}`);
  }

  return (
    <div className="my-16">
      <div>
        <p>
          You have approved a transfer of {toEth(amount)}{" "}
          {process.env.NEXT_PUBLIC_STABLE_SYMBOL}
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
  );
}
