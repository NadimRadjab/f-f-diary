import Meal from "../seeds/Meal";
import { v4 as uuid4 } from "uuid";

export const mealCreator = (arr: {}[], pageNumber: string) => {
  for (let i = 1; i < 6; i++) {
    arr.push({ ...new Meal(uuid4(), pageNumber, i, [], 0) });
  }
};
