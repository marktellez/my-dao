import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const stableAbi = require("@/contracts/DaiMock.sol/abi.json");
const tokenAbi = require("@/contracts/RewardToken.sol/abi.json");
const stakingAbi = require("@/contracts/RewardTokenStaking.sol/abi.json");
const marketAbi = require("@/contracts/Market.sol/abi.json");

export const Web3Context = createContext(undefined);

export default function Web3Provider({ children }) {
  const [provider, setProvider] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  useEffect(async () => {
    setProvider(
      new ethers.providers.Web3Provider(window.ethereum, "any") ||
        (await ethers.getDefaultProvider())
    );
  }, []);

  useEffect(() => {
    async function accountsChangedListener(accounts) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      setProvider(provider);
      setAddress(accounts[0]);
      setBalance(await provider.getBalance(accounts[0]));
    }
    window.ethereum.on("accountsChanged", accountsChangedListener);

    return () =>
      window.ethereum.removeListener(
        "accountsChanged",
        accountsChangedListener
      );
  }, [address]);

  async function authenticate() {
    await provider.send("eth_requestAccounts");
    const signer = provider.getSigner();
    const _address = await signer.getAddress();
    setAddress(_address);
    setBalance(await provider.getBalance(_address));
  }

  function disconnect() {
    setAddress(undefined);
    setBalance(0);
  }

  async function getNetwork() {
    return address && (await provider.getNetwork());
  }

  function getSigner() {
    return provider && provider.getSigner();
  }

  const data = {
    provider,
    address,
    authenticate,
    disconnect,
    balance,
    getNetwork,
    getSigner,
    tokenAbi,
    stableAbi,
    marketAbi,
    stakingAbi,
  };

  return <Web3Context.Provider value={data}>{children}</Web3Context.Provider>;
}
