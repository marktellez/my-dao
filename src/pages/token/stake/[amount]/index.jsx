import { useRouter } from "next/router";

import SecurePage from "@/ui/page/secure";
import StakeToken from "@/features/token/stake/transfer";

import Paper from "@/ui/paper";
import Stepper from "@/ui/stepper";

export default function StakeTokenPage({}) {
  const router = useRouter();
  const { amount } = router.query;

  return (
    <SecurePage>
      <Stepper
        steps={[
          { label: "Approve", link: "/token/stake" },
          {
            label: "Stake",
            link: `/token/stake/${amount}`,
          },
        ]}
        index={1}
      />

      <Paper>
        <StakeToken />
      </Paper>
    </SecurePage>
  );
}
