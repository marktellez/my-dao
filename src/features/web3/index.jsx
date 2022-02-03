import { createContext, useState, useEffect, useMemo } from "react";
import { ethers, utils } from "ethers";

const chains = require("@/data/supported-chains.json");

export const Web3Context = createContext(undefined);

export default function Web3Provider({ children }) {
  const [provider, setProvider] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [chainId, setChainId] = useState("0x13881");

  useEffect(async () => {
    setProvider(new ethers.providers.Web3Provider(window.ethereum, "any"));
  }, [chainId]);

  useEffect(() => {
    ethereum.on("accountsChanged", accountsChangedListener);
    ethereum.on("chainChanged", chainChangedListener);

    return () => {
      ethereum.removeListener("accountsChanged", accountsChangedListener);
      ethereum.removeListener("chainChanged", chainChangedListener);
    };
  }, [address, chainId]);

  useEffect(() => {
    if (!provider) return;
    provider.on("network", handleNetworkChange);

    return () => provider.removeListener("network", handleNetworkChange);
  }, [provider, chainId]);

  useEffect(async () => {
    if (!address) return;

    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                ...chains[currentChain.chainId],
                chainId,
              },
            ],
          });
        } catch (addError) {}
      }
    }
  }, [chainId]);

  async function handleNetworkChange(network) {
    await setProvider(
      new ethers.providers.Web3Provider(window.ethereum, network)
    );
    const chainId = utils.hexStripZeros(utils.hexlify(network.chainId));

    setChainId(chainId);
  }

  async function chainChangedListener(chainId) {
    setChainId(chainId);
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    setProvider(provider);
    const accounts = await ethereum.request({ method: "eth_accounts" });
    setAddress(accounts[0]);
    setBalance(await provider.getBalance(accounts[0]));
  }

  async function accountsChangedListener(accounts) {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    setProvider(provider);

    setAddress(accounts[0]);
    setBalance(await provider.getBalance(accounts[0]));
  }

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
    chains,
    chainId,
    setChainId,
  };

  return <Web3Context.Provider value={data}>{children}</Web3Context.Provider>;
}
