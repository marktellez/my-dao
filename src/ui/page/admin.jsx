import useWeb3 from "@/features/web3/hooks/use-web3";
import LoginForm from "@/features/authentication/log-in";

import Page from "./";

export default function AdminPage({ children }) {
  const { address } = useWeb3();

  return (
    <Page>
      {address === process.env.NEXT_PUBLIC_TOKEN_OPERATOR_ADDRESS ? (
        children
      ) : (
        <div>
          <div>
            <h1 className="text-center">You are not authorized to do that.</h1>
          </div>
          <div className="w-full flex justify-center">
            <LoginForm />
          </div>
        </div>
      )}
    </Page>
  );
}
