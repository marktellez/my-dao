export default function LabelValue({ label, value }) {
  return (
    <div className="flex">
      <div className="flex-grow font-medium">{label}</div>
      <div className="font-bold">{value}</div>
    </div>
  );
}
