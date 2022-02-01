import { useEffect, useState, useContext } from "react";

import { Web3Context } from "../";

export default function useWeb3() {
  const context = useContext(Web3Context);

  return context;
}
