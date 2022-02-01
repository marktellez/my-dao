import { useState, useEffect } from "react";
import Web3Provider from "@/features/web3";

import TxWindow from "@/ui/tx-window";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useContract from "@/features/web3/hooks/use-contract";
import { toEth, toWei } from "@/modules/units";

const tokenAbi = require("@/contracts/RewardToken.sol/abi.json");
const stakingAbi = require("@/contracts/RewardTokenStaking.sol/abi.json");

function TestPage() {
  const [availableRewards, setAvailableRewards] = useState(0);
  const [yourStaked, setYourStaked] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);

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
    if (!tokenContract || !address) return;

    setAvailableRewards(await tokenContract.balanceOf(address));
  }, [tokenContract, address]);

  useEffect(async () => {
    if (!stakingContract || !address) return;

    setTotalStaked(await stakingContract.stakedSupply());
    setYourStaked(await stakingContract.balanceOf(address));
  }, [stakingContract]);

  async function handleTx() {
    return await tokenContract
      .connect(provider.getSigner())
      .approve(process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS, toWei("0.01"));
  }

  function onApprove(owner, spender, amount, event) {}

  return (
    <div className="mx-auto w-1/2">
      <div>
        <div className="flex">
          <div className="w-32">Available:</div>
          <div>{toEth(availableRewards)}</div>
        </div>

        <div className="flex">
          <div className="w-32">Your Staked:</div>
          <div>{toEth(yourStaked)}</div>
        </div>

        <div className="flex">
          <div className="w-32">Total Staked:</div>
          <div>{toEth(totalStaked)}</div>
        </div>
      </div>

      <div className="my-8">
        <TxWindow
          contract={tokenContract}
          txHandler={handleTx}
          eventName={"Approval"}
          buttonText="Approve 0.01 transfer"
          onConfirmation={onApprove}
        />
      </div>
    </div>
  );
}

export default function TestApp({}) {
  return (
    <Web3Provider>
      <TestPage />
    </Web3Provider>
  );
}
