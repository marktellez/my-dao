import { useRouter } from "next/router";

import { PrimaryButton, SecondaryButton } from "@/ui/buttons";
import Paper from "@/ui/paper";
import Token from "@/ui/token";

import useBalances from "@/features/web3/hooks/use-balances";

import { toEth } from "@/modules/units";

export default function Dashboard({}) {
  const { circulatingSupply, totalStaked } = useBalances();

  const router = useRouter();

  return (
    <Paper className="w-full">
      <h1>Dashboard</h1>

      <div className="mb-12">
        <h2>DAO Stats</h2>

        <div>Circulating Supply: {toEth(circulatingSupply)}</div>
        <div>Total Staked: {toEth(totalStaked)}</div>
      </div>

      <div className="flex space-x-8 w-full my-8">
        <PrimaryButton block onClick={() => router.push("/token/buy")}>
          Buy <Token {...{ name: "TZD" }} /> tokens
        </PrimaryButton>
        <SecondaryButton block onClick={() => router.push("/token/stake")}>
          Stake your tokens
        </SecondaryButton>
      </div>
    </Paper>
  );
}
