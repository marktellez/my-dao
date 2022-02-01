import { useEffect, useState } from "react";
import useWeb3 from "@/features/web3/hooks/use-web3";
import { ethers } from "ethers";
import useContract from "@/features/web3/hooks/use-contract";
import { toEth } from "@/modules/units";

export default function Balances() {
  const [stableBalance, setStableBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);

  const { provider, address, balance, stableAbi, tokenAbi } = useWeb3();

  const daiContract = useContract({
    address: process.env.NEXT_PUBLIC_DAI_CONTRACT_ADDRESS,
    abi: stableAbi.abi,
    providerOrSigner: provider,
  });

  const tokenContract = useContract({
    address: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS,
    abi: tokenAbi.abi,
    providerOrSigner: provider,
  });

  useEffect(async () => {
    if (!daiContract) return;
    setStableBalance(await daiContract.balanceOf(address));
  }, [daiContract]);

  useEffect(async () => {
    if (!tokenContract) return;
    setTokenBalance(await tokenContract.balanceOf(address));
  }, [daiContract]);

  return (
    <div className="flex items-center justify-center space-x-4">
      <div>
        {balance > 0 &&
          parseFloat(ethers.utils.formatEther(balance || 0.0)).toFixed(4) +
            " MATIC"}
      </div>

      <div>
        {stableBalance > 0 && toEth(stableBalance)}{" "}
        {process.env.NEXT_PUBLIC_STABLE_SYMBOL}
      </div>

      <div>
        {tokenBalance > 0 && toEth(tokenBalance)}{" "}
        {process.env.NEXT_PUBLIC_TOKEN_SYMBOL}
      </div>
    </div>
  );
}
