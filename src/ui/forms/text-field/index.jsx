import { useState, useEffect, useRef } from "react";

export default function TextField({
  type = "text",
  className,
  label,
  value,
  onChange = () => {},
  ...rest
}) {
  const [active, setActive] = useState(false);
  const ref = useRef(undefined);

  useEffect(() => {
    if (!active) return;
    ref.current.focus();
  }, [active]);

  useEffect(() => {
    setActive(typeof value !== undefined);
  }, [value]);

  return (
    <div className="relative w-full my-2">
      <div
        onClick={() => setActive(true)}
        className={`ml-2 absolute transition-all transform delay-100 ${
          active || active ? "-top-6" : "top-0"
        }`}>
        {label && (
          <label className="font-bold text-lg tracking-wide opacity-90">
            {label}
          </label>
        )}
      </div>
      <div className="w-full">
        <input
          ref={ref}
          className={`outline-none border-b border-b-1 p-2 text-white bg-transparent w-full ${className}`}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setActive(true)}
          {...rest}
        />
      </div>
    </div>
  );
}
