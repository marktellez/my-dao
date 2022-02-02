import { useState, useEffect } from "react";

import TxButton from "@/ui/buttons/tx";
import Notice from "@/ui/notices";

import useWeb3 from "@/features/web3/hooks/use-web3";

const NONE = undefined;
const SIGNING = "SIGNING";
const CONFIRMING = "CONFIRMING";
const CONFIRMED = "CONFIRMED";
const ERROR = "ERROR";
const DELAY = 3500;

export default function TxWindow({
  disabled = false,
  contract,
  txHandler = () => {},
  signingText,
  confirmingText,
  eventName,
  onStart = () => {},
  onError = () => {},
  onConfirmation = () => {},
  onBusyChanged = () => {},
  renderButtonText = () => {},
}) {
  const [busy, _setBusy] = useState(busy);
  const [error, setError] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [timer, setTimer] = useState(undefined);

  const { address } = useWeb3();

  useEffect(() => {
    if (!contract) return;

    contract.on(eventName, handleConfirmationEvent);

    return () => {
      contract.removeAllListeners();
      clearTimeout(timer);
    };
  }, [contract]);

  function setBusy(busy) {
    onStart();
    _setBusy(busy);
    onBusyChanged(busy);
  }

  async function handleConfirmationEvent(...rest) {
    setStatus(CONFIRMED);
    onConfirmation(...rest);

    setTimer(
      setTimeout(() => {
        reset();
      }, DELAY)
    );
  }

  async function handleTx() {
    setBusy(true);
    setStatus(SIGNING);

    try {
      await txHandler();

      setStatus(CONFIRMING);
    } catch (e) {
      handleTxError(e);
    }
  }

  function handleTxError(e) {
    onError();
    setStatus(ERROR);
    setError(e.message);

    setTimer(
      setTimeout(() => {
        reset();
      }, DELAY)
    );
  }

  function reset() {
    setStatus(NONE);
    setBusy(false);
    setError(undefined);
  }

  return (
    <>
      <div className="border border-black-500 w-full">
        <TxButton block busy={busy || disabled} onClick={handleTx}>
          {renderButtonText() || "Continue"}
        </TxButton>
      </div>

      {status && (
        <div className="border border-black-500 w-full text-center">
          {status === SIGNING && (
            <Notice type="busy">{signingText || "Opening Metamask..."}</Notice>
          )}
          {status === CONFIRMING && (
            <Notice type="busy">
              {confirmingText || "Confirming your transaction."}
            </Notice>
          )}
          {status === CONFIRMED && (
            <Notice type="success">
              {confirmingText || "The transaction was confirmed."}
            </Notice>
          )}

          {status === ERROR && <Notice type="error">{error}</Notice>}
        </div>
      )}
    </>
  );
}
