export default function Paper({ children, className }) {
  return (
    <div
      className={`w-1/2 bg-black-500 border-2 border-black-700 py-6 px-10 rounded-sm shadow-md ${className}`}>
      {children}
    </div>
  );
}
