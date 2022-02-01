import { useRouter } from "next/router";
import Page from "@/ui/page";
import Paper from "@/ui/paper";
import OutlineButton from "@/ui/buttons/outline";

export default function Homepage({}) {
  const router = useRouter();

  return (
    <Page>
      <Paper className="w-2/3">
        <h1>Welcome to my DAO</h1>

        <p>
          I am building a system that is open source that allows you to buy my
          native token (ERC20) and stake it to earn interest on your investment
          in me, Mark Tellez, a highly gifted 10x programmer with over 25 years
          of experience.
        </p>

        <p>
          By buying into my DAO you are buying a share of my continued success,
          and helping me with a grand experiment in tokenomics and blockchain,
          which I can then in turn, teach to my students.
        </p>

        <p>
          I will be adding a large collection of smart contracts to do token
          swaps, voting, staking, and much more, and those smart contracts (open
          sourced) will be used to run this website and the DAO generally.
        </p>

        <OutlineButton block onClick={() => router.push("/dashboard")}>
          Get Started
        </OutlineButton>
      </Paper>
    </Page>
  );
}
