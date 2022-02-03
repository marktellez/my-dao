import ContractLink from "./";

import { DocumentTextIcon, ExternalLinkIcon } from "@heroicons/react/outline";

export default function ContractLinkText({ address }) {
  return (
    <div className="flex items-center justify-around">
      <div className="flex-grow flex items-center space-x-2">
        <div>
          <DocumentTextIcon className="h-4 w-4" />
        </div>
        <div>
          <ContractLink {...{ address }} />
        </div>
      </div>
      <div className="flex items-center space-x-2 mx-4">
        <div>
          <ExternalLinkIcon className="h-4 w-4" />
        </div>
        <div>View on block explorer</div>
      </div>
    </div>
  );
}
