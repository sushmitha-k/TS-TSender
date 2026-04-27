export const calculateTotal = (amounts: string): number => {
  if (!amounts) return 0;

  return amounts
    .split(/[\n,]+/)
    .map((val) => val.trim())
    .filter(Boolean)
    .reduce((sum, val) => {
      const num = Number(val);
      return isNaN(num) ? sum : sum + num;
    }, 0);
};