import SecurePage from "@/ui/page/secure";
import BuyRewardToken from "@/features/token/buy/transfer";

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
        <BuyRewardToken />
      </Paper>
    </SecurePage>
  );
}
