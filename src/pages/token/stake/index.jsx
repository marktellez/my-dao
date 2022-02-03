import SecurePage from "@/ui/page/secure";
import ApproveTransfer from "@/features/token/stake";

import Paper from "@/ui/paper";
import Stepper from "@/ui/stepper";

export default function ApproveTokenStakePage({}) {
  return (
    <SecurePage>
      <Stepper
        steps={[
          { label: "Approve", link: "/token/stake" },
          {
            label: "Stake",
          },
        ]}
        index={0}
      />

      <Paper>
        <ApproveTransfer />
      </Paper>
    </SecurePage>
  );
}
