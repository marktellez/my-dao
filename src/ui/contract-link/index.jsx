import { ellipsis } from "@/modules/string";

export default function ContractLink({ address }) {
  return (
    <a
      href={`${process.env.NEXT_PUBLIC_TX_SCANNER}/address/${address}`}
      target="_blank">
      {ellipsis(address)}
    </a>
  );
}
