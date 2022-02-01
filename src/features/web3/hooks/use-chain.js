import { useEffect, useState, useContext } from "react";
import { Web3Context } from "../";

export default function useChain() {
  const [chainId, setChainId] = useState(undefined);
  const context = useContext(Web3Context);

  useEffect(async () => {
    setChainId(await context.getNetwork());
  }, []);

  return [chainId, setChainId];
}
