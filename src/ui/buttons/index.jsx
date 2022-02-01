import { useState, useEffect } from "react";

export default function Button({
  children,
  className,
  busyText,
  busy = false,
  block = false,
  disabled = false,
  ...rest
}) {
  const [clicked, setClicked] = useState(false);
  const staticClassNames = `scale-100`;
  const disabledClassNames = `cursor-not-allowed opacity-40`;
  const animateClassNames = `transition transform duration-600 `;
  const clickedClassNames = `scale-110`;

  useEffect(() => {
    const fn = () => {
      setClicked(false);
    };
    setTimeout(fn, 500);
    return () => clearTimeout(fn);
  }, [clicked]);

  return (
    <button
      className={`${staticClassNames} ${animateClassNames} ${
        clicked ? clickedClassNames : ""
      } ${disabled || busy ? disabledClassNames : ""} ${
        block ? "block" : ""
      } ${className}`}
      onClick={() => setClicked(true)}
      disabled={disabled || busy}
      {...rest}>
      {busy && busyText ? busyText : children}
    </button>
  );
}

import PrimaryButton from "./primary";
import SecondaryButton from "./secondary";
import OutlineButton from "./outline";
import LinkButton from "./link";

export { PrimaryButton, SecondaryButton, OutlineButton, LinkButton };
