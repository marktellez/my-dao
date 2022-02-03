import { useState, useEffect } from "react";
import copy from "copy-to-clipboard";

const defaultTooltipText = {
  copy: "Copy",
  copied: "Copied!",
};

export default function useCopyClipboard(text) {
  const [isCopied, setIsCopied] = useState(false);
  const [status, setStatus] = useState(defaultTooltipText.copy);
  const successDuration = 1500;

  useEffect(() => {
    if (isCopied && successDuration) {
      const id = setTimeout(() => {
        setIsCopied(false);
      }, successDuration);

      return () => {
        clearTimeout(id);
      };
    }
  }, [isCopied, successDuration]);

  return {
    isCopied,
    status,
    setCopied: () => {
      const didCopy = copy(text);
      setStatus(defaultTooltipText.copied);
      setIsCopied(didCopy);
      setTimeout(() => {
        setStatus(defaultTooltipText.copy);
      }, 1500);
    },
  };
}
