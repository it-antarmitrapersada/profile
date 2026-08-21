import { expect, test } from "vitest";
import { sum } from "./sum";

test("sum function adds two numbers correctly", () => {
  const result = sum(2, 3);
  expect(result).toBe(5);
});
