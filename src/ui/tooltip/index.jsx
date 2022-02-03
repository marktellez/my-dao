import { useRef, useState, useEffect } from "react";
import useMouse from "@react-hook/mouse-position";

export default function Tooltip({ children, text }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mouseX, setMouseX] = useState(0);

  const ref = useRef(undefined);
  const mouse = useMouse(ref, {
    enterDelay: 500,
    leaveDelay: 500,
  });

  useEffect(() => {
    setMouseX(mouse.x);
  }, [mouse.x]);

  return (
    <div
      className="relative"
      ref={ref}
      onMouseOver={() => setShowTooltip(true)}
      onMouseOut={() => setShowTooltip(false)}>
      {showTooltip && (
        <div
          className="absolute -top-10 bg-black-500 text-white p-1 z.50 border rounded"
          style={{
            left: mouseX / 2,
          }}>
          {text}
        </div>
      )}
      <>{children}</>
    </div>
  );
}
