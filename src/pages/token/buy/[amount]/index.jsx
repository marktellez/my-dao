import SecurePage from "@/ui/page/secure";
import BuyDaoToken from "@/features/token/buy/transfer";

import Paper from "@/ui/paper";
import Stepper from "@/ui/stepper";

export default function BuyPage({}) {
  return (
    <SecurePage>
      <Stepper
        steps={[
          { label: "Approve", link: "/token/buy" },
          {
            label: "Buy",
          },
        ]}
        index={1}
      />
      <Paper>
        <BuyDaoToken />
      </Paper>
    </SecurePage>
  );
}
