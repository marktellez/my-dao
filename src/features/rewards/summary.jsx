import { toEth } from "@/modules/units";

export default function RewardSummary({
  availableRewards,
  yourStaked,
  totalStaked,
  totalEarned,
}) {
  return (
    <div className="bg-gradient-to-b from-blue-400 to-blue-700 p-[1px] w-full">
      <div className="bg-black-700 p-4 ">
        <div className="flex">
          <div className="w-32">Available:</div>
          <div>{toEth(availableRewards)}</div>
        </div>

        <div className="flex">
          <div className="w-32">Your Staked:</div>
          <div>{toEth(yourStaked)}</div>
        </div>

        <div className="flex">
          <div className="w-32">Earned:</div>
          <div>{toEth(totalEarned)}</div>
        </div>

        <div className="flex">
          <div className="w-32">Total Staked:</div>
          <div>{toEth(totalStaked)}</div>
        </div>
      </div>
    </div>
  );
}
