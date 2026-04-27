export const parseInput = (value: string) => {
    return value
      .split(/[\n,]+/)
      .map((v) => v.trim())
      .filter(Boolean);
};

export {calculateTotal} from "./calculateTotal";