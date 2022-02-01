import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function useContract({ address, abi, providerOrSigner }) {
  const [contract, setContract] = useState(undefined);

  useEffect(() => {
    if (!providerOrSigner || !address) return;
    const contract = new ethers.Contract(address, abi, providerOrSigner);

    setContract(contract);

    return () => contract.removeAllListeners();
  }, [providerOrSigner, address]);

  return contract;
}
