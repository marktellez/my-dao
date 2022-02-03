import SecurePage from "@/ui/page/secure";
import BuyTokens from "@/features/token/buy";

import Paper from "@/ui/paper";
import Stepper from "@/ui/stepper";

export default function ApproveDaiBuyPage({}) {
  return (
    <SecurePage>
      <Stepper
        steps={[
          { label: "Approve", link: "/token/buy" },
          {
            label: "Buy",
          },
        ]}
        index={0}
      />
      <Paper>
        <BuyTokens />
      </Paper>
    </SecurePage>
  );
}
