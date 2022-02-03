import { useState, useEffect } from "react";
import Link from "next/link";
import { LogoutIcon, LinkIcon } from "@heroicons/react/solid";

import AccountModal from "@/features/account/modal";
import Container from "@/ui/container";
import Token from "@/ui/token";
import Modal from "@/ui/modal";

import useWeb3 from "@/features/web3/hooks/use-web3";
import useBalances from "@/features/web3/hooks/use-balances";

import { ellipsis } from "@/modules/string";
import { toEth } from "@/modules/units";

export default function Header({}) {
  const [network, setNetwork] = useState("");
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showChainModal, setShowChainModal] = useState(false);

  const {
    disconnect,
    provider,
    address,
    balance,
    chains,
    chainId,
    setChainId,
  } = useWeb3();

  const contracts = require("@/data/contracts.json")[chainId];

  const { daoBalance, daiBalance, stakedBalance } = useBalances({
    chainId,
    provider,
    address,
  });

  return (
    <header className="fixed top-0 w-full">
      <Container>
        <div className="flex py-6 px-4 items-center">
          <div className="flex-grow text-lg">
            <Link href={"/"}>
              <a className="text-white font-heading text-4xl">
                <>
                  <span className="opacity-80 text-black-200">Tellez</span>
                  <span className="opacity-90">DAO</span>
                </>
              </a>
            </Link>
            <span className="px-8 ">
              <Link href={"/dashboard"}>
                <a className="text-white no-underline uppercase">Dashboard</a>
              </Link>
            </span>
          </div>

          {address && (
            <div className="flex items-center space-x-4">
              {daiBalance > 0 && (
                <div className="rounded-lg bg-blue-600 py-1 px-3">
                  {toEth(daiBalance)}
                  <Token {...{ name: "DAI" }} />
                </div>
              )}

              {daoBalance > 0 && (
                <div>
                  <div className="rounded-lg bg-green-600 py-1 px-3 relative">
                    {toEth(daoBalance)}
                    <Token {...{ name: "TZD" }} />
                  </div>
                  <div className="flex justify-center">
                    <div className="absolute text-sm px-1 mt-1">Deposited</div>
                  </div>
                </div>
              )}

              {stakedBalance > 0 && (
                <div>
                  <div className="rounded-lg bg-pink-400 py-1 px-3">
                    {toEth(stakedBalance)}
                    <Token {...{ name: "TZD" }} />
                  </div>
                  <div className="flex justify-center">
                    <div className="absolute text-sm px-1 mt-1">Staked</div>
                  </div>
                </div>
              )}

              <div
                className="border p-3 rounded"
                onClick={() => setShowChainModal(true)}>
                <LinkIcon className="w-4 h-4" />
              </div>

              <div className="flex items-center rounded-lg bg-gray-600 p-1 space-x-2">
                <div className="px-2">{toEth(balance || 0, 3) + " MATIC"}</div>

                <div
                  onClick={() => setShowAccountModal(true)}
                  className="border-2 border-gray-500 rounded-lg bg-gray-500 py-1 px-3 text-sm hover:border-blue-600 hover:bg-gray-400">
                  {ellipsis(address)}
                </div>
              </div>

              <div className="border p-2 rounded bg-black-900 border-black-600 hover:bg-black-500">
                <LogoutIcon className="w-4 h-4" onClick={() => disconnect()} />
              </div>
            </div>
          )}
        </div>
      </Container>

      <AccountModal
        {...{
          network,
          address,
          balance,
          close: () => setShowAccountModal(false),
          isOpen: showAccountModal,
        }}
      />

      <Modal
        {...{
          close: () => setShowChainModal(false),
          isOpen: showChainModal,
        }}>
        <ul>
          {chains.map((chain) => (
            <li key={chain.hex}>
              <div
                className={`flex items-center space-x-2 py-4 px-2 border border-gray-300 rounded my-2 hover:border-white hover:bg-blue-700 ${
                  chainId === chain.hex ? "bg-blue-700" : ""
                }`}
                onClick={() => {
                  setChainId(chain.hex);
                  setShowChainModal(false);
                }}>
                <div>
                  {
                    <img
                      src={chain.icon}
                      alt={`${chain.name} icon`}
                      className="h-4 2-4"
                    />
                  }
                </div>
                <div>{chain.name}</div>
              </div>
            </li>
          ))}
        </ul>
      </Modal>
    </header>
  );
}
