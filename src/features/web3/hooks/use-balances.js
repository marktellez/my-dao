import { useState, useEffect } from "react";
import useContract from "@/features/web3/hooks/use-contract";
import useWeb3 from "@/features/web3/hooks/use-web3";

import { BigNumber } from "ethers";

const daiAbi = require("@/contracts/DaiMock.sol/abi.json");
const daoAbi = require("@/contracts/DaoToken.sol/abi.json");
const stakingAbi = require("@/contracts/DaoStaking.sol/abi.json");
const marketAbi = require("@/contracts/Market.sol/abi.json");

export default function useBalances() {
  const [daiBalance, setDaiBalance] = useState(0);
  const [daoBalance, setDaoBalance] = useState(0);
  const [stakedBalance, setStakedBalance] = useState(0);
  const [circulatingSupply, setCirculatingSupply] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);

  const { address, provider, chainId } = useWeb3();

  const contracts = require("@/data/contracts.json")[chainId];

  const daoContract = useContract({
    address: contracts.dao.address,
    abi: daoAbi.abi,
    providerOrSigner: provider,
  });

  const daiContract = useContract({
    address: contracts.dai.address,
    abi: daiAbi.abi,
    providerOrSigner: provider,
  });

  const stakingContract = useContract({
    address: contracts.staking.address,
    abi: stakingAbi.abi,
    providerOrSigner: provider,
  });

  useEffect(async () => {
    if (!stakingContract || !address) return;
    try {
      setTotalStaked(await stakingContract.totalStaked());
    } catch {}
  }, [stakingContract, address]);

  useEffect(async () => {
    if (!daiContract || !address) return;

    try {
      setDaiBalance(
        (await daiContract.balanceOf(address)) || BigNumber.from("0")
      );
    } catch (e) {}
  }, [address, daiContract]);

  useEffect(async () => {
    if (!daoContract || !address) return;

    try {
      setDaoBalance(
        (await daoContract.balanceOf(address)) || BigNumber.from("0")
      );
      setCirculatingSupply(await daoContract.circulatingSupply());
    } catch (e) {}
  }, [address, daoContract]);

  useEffect(async () => {
    if (!stakingContract || !address) return;

    try {
      setStakedBalance(
        (await stakingContract.balanceOf(address)) || BigNumber.from("0")
      );
    } catch (e) {}
  }, [address, stakingContract]);

  return {
    daiAbi,
    daoAbi,
    stakingAbi,
    marketAbi,
    daiBalance,
    daoBalance,
    stakedBalance,
    totalStaked,
    circulatingSupply,
  };
}
