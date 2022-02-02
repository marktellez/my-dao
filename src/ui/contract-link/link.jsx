import ContractLink from "./";

export default function ContractLinkText({ address }) {
  return (
    <div className="border border-black-500 p-3 ">
      <div className="flex items-center space-x-2">
        <div>
          <img
            src="/images/icons/contract.png"
            alt="contract icon"
            width={48}
          />
        </div>
        <div>
          <ContractLink {...{ address }} />
          <div className="text-xs">View the contract</div>
        </div>
      </div>
    </div>
  );
}
