export default function Paper({ children, className }) {
  return (
    <div
      className={`mx-auto bg-black-800 py-8 px-16 rounded-4xl my-8 shadow-md ${
        className ? className : "w-full md:w-[700px]"
      }`}>
      {children}
    </div>
  );
}
