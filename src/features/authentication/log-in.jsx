import useWeb3 from "@/features/web3/hooks/use-web3";
import OutlineButton from "@/ui/buttons/outline";

export default function LogIn({ label = "Connect to Metamask" }) {
  const { authenticate } = useWeb3();

  return (
    <>
      <OutlineButton
        onClick={async () => {
          try {
            await authenticate({ provider: "injected" });
            window.localStorage.setItem("connectorId", "injected");
          } catch (e) {
            console.error(e);
          }
        }}>
        {label}
      </OutlineButton>
    </>
  );
}
