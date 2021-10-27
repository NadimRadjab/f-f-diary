export type WeeklyPlan = {
  day: string;
  id?: string;
  date?: string | Date;
  meals: PlanMeal[];
  nutrients: PlanNutrients;
};
export type PlanMeal = {
  id: string;
  title: string;
  servings: number;
  readyInMinutes: number;
  sourceUrl: string;
};
export type PlanNutrients = {
  [calories: string]: number;
  protein: number;
  fat: number;
  carbohydrates: number;
};
