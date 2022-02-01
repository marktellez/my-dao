import { toEth } from "@/modules/units";

export default function Matic({ wei }) {
  return <span>{toEth(wei)} matic</span>;
}
