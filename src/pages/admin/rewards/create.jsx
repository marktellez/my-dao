import { useState, useEffect } from "react";

import AdminPage from "@/ui/page/admin";
import Paper from "@/ui/paper";
import CreateReward from "@/features/rewards/create";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";
import { toEth } from "@/modules/units";

const tokenAbi = require("@/contracts/RewardToken.sol/abi.json");
const stakingAbi = require("@/contracts/RewardTokenStaking.sol/abi.json");

export default function AdminCreateReward({}) {
  const [totalSupply, setTotalSupply] = useState(0);
  const [availableSupply, setAvailableSupply] = useState(0);
  const [burnedSupply, setBurnedSupply] = useState(0);
  const [stakedSupply, setStakedSupply] = useState(0);

  const { address, provider } = useWeb3();

  const stakingContract = useContract({
    address: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS,
    abi: stakingAbi.abi,
    providerOrSigner: provider,
  });

  const tokenContract = useContract({
    address: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS,
    abi: tokenAbi.abi,
    providerOrSigner: provider,
  });

  useEffect(async () => {
    if (!tokenContract) return;

    setTotalSupply(await tokenContract.totalSupply());
    setAvailableSupply(await tokenContract.availableSupply());
    setBurnedSupply(await tokenContract.burnedSupply());
  }, [tokenContract]);

  useEffect(async () => {
    if (!stakingContract) return;

    setStakedSupply(await stakingContract.stakedSupply());
  }, [stakingContract]);

  function onReward() {}

  return (
    <AdminPage>
      <Paper className="w-1/2">
        <div>
          <h1>Rewards Admin</h1>
        </div>

        <div className="border border-blue-300 p-3 my-4">
          <div className="flex">
            <div className="w-20">Available:</div>
            <div>{toEth(availableSupply)}</div>
          </div>

          <div className="flex">
            <div className="w-20">Staked:</div>
            <div>{toEth(stakedSupply)}</div>
          </div>

          <div className="flex">
            <div className="w-20">Burned:</div>

            <div>{toEth(burnedSupply)}</div>
          </div>

          <div className="flex">
            <div className="w-20">Total:</div>
            <div>{toEth(totalSupply)}</div>
          </div>
        </div>

        <CreateReward
          {...{
            provider,
            contract: tokenContract,
            onReward,
          }}
        />
      </Paper>
    </AdminPage>
  );
}
