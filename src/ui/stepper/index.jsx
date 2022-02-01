export default function Stepper({ steps = [], index = 0 }) {
  return (
    <div
      className={
        "rounded-full bg-transparent border border-blue-500 flex justify-around space-x-4"
      }>
      {steps.map((step, i) => (
        <div
          className={`py-1 px-8 ${
            index == i ? "bg-blue-500 rounded-full" : ""
          }`}>
          {steps[i].label}
        </div>
      ))}
    </div>
  );
}
