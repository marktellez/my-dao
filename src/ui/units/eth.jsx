import { toEth } from "@/modules/units";

export default function Eth({ wei }) {
  return <span>{toEth(wei)} eth</span>;
}
