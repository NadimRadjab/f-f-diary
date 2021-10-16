import { getMealCalories, pages } from "./testfuncs";

test("Total calories for a single meal", () => {
  expect(getMealCalories(pages, "1")).toBe(413);
});
