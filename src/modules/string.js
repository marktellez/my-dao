export function ellipsis(str, n = 4) {
  if (str) {
    return `0x${str.slice(2, n + 2)}...${str.slice(str.length - n)}`;
  }
  return "";
}
