export default function ProTip({ children, title }) {
  return (
    <div className="my-8 p-3 border border-black-500">
      <h3 className="my-2">
        <span className="font-bold">Pro tip:</span> {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}
