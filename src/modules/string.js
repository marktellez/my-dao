export function getEllipsisTxt(str, n = 4) {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n - 1)}`;
  }
  return "";
}
