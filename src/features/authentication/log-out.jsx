import useWeb3 from "@/features/web3/hooks/use-web3";
import OutlineButton from "@/ui/buttons/outline";

export default function LogOut({}) {
  const { disconnect } = useWeb3();

  return (
    <OutlineButton onClick={async () => await disconnect()}>
      Disconnect Wallet
    </OutlineButton>
  );
}
