import { describe, expect, it } from "vitest";
import { calculateTotal } from "./index";
​
describe("calculateTotal", () => {
  it("should sum numbers separated by newlines", () => {
    const input = "100\n200\n50";
    const expectedOutput = 350;
    expect(calculateTotal(input)).toBe(expectedOutput);
  });

  it("should sum numbers separated by commas", () => {
    expect(calculateTotal("100,200,75")).toBe(375);
  });

  it("should handle a single number", () => {
    expect(calculateTotal("500")).toBe(500);
  });

  it("should return 0 for an empty string", () => {
    expect(calculateTotal("")).toBe(0);
  });
});