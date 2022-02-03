import Link from "next/link";

export default function Stepper({ steps = [], index = 0 }) {
  return (
    <div className="flex items-center justify-center ">
      <div
        className={
          "rounded-full bg-transparent border border-blue-500 flex justify-around "
        }>
        {steps.map((step, i) => (
          <div
            className={`py-1 px-8 ${
              index == i ? "bg-blue-500 rounded-full" : ""
            }`}>
            {steps[i].link ? (
              <Link href={steps[i].link}>
                <a className="no-underline text-white">{steps[i].label}</a>
              </Link>
            ) : (
              steps[i].label
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
