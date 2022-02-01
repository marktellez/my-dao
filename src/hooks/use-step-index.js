import { useState } from "react";

export default function useStepIndex(max = 0) {
  const [index, setIndex] = useState(0);

  function forward() {
    setIndex((prev) => (prev < max ? prev + 1 : max));
  }

  function back() {
    setIndex((prev) => (prev > 0 ? prev - 1 : 0));
  }

  function reset() {
    setIndex(0);
  }

  return {
    index,
    forward,
    back,
    reset,
  };
}
