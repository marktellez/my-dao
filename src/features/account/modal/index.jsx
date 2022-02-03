import { ClipboardCopyIcon, ExternalLinkIcon } from "@heroicons/react/outline";

import useWeb3 from "@/features/web3/hooks/use-web3";

import useClipboard from "@/hooks/use-clipboard";

import Modal from "@/ui/modal";
import Tooltip from "@/ui/tooltip";

import { ellipsis } from "@/modules/string";

export default function AccountModal({
  address,
  isOpen = false,
  close,
  balance,
}) {
  const { isCopied, setCopied, status } = useClipboard(address);
  const { disconnect } = useWeb3();

  return (
    <Modal isOpen={isOpen} close={close} title={"Account"}>
      <div className="rounded-lg border border-gray-700 p-4 text-white my-8">
        <div className="mb-4 opacity-50">Connected with Metamask</div>

        <div className="">
          <div
            className="text-xl tracking-wider my-2"
            onClick={() => setCopied(true)}>
            <Tooltip {...{ text: status }}>
              <div className="flex items-center space-x-3">
                <div>{ellipsis(address)}</div>
                <ClipboardCopyIcon className="w-4 h-4" />
              </div>
            </Tooltip>
          </div>
          <div className="flex items-center space-x-8">
            <a
              className="no-underline"
              href={`https://mumbai.polygonscan.com/address/${address}`}
              target="_blank">
              <div className="text-sm text-white flex items-center space-x-1 my-2 opacity-50">
                <ExternalLinkIcon className="w-4 h-4" />
                <div>View on block explorer</div>
              </div>
            </a>
          </div>
        </div>

        <div>
          <a
            onClick={async () => {
              await disconnect();
              close();
            }}>
            Log out
          </a>
        </div>
      </div>
    </Modal>
  );
}
