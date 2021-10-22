export type Recipe = {
  id: number;
  image: string;
  title: string;
  diets: string[];
  healthScore: number;
  summary: string;
  readyInMinutes: string;
  analyzedInstructions: Instructions[];
  extendedIngredients: {
    id: number;
    aisle: string;
    image: string;
    name: string;
    amount: number;
    unit: string;
    original: string;
  }[];
};
export type Instructions = {
  steps: {
    number: number;
    step: string;
    ingredients: { id: number; name: string; image: string }[];

    equipment?: {
      id: number;
      name: "bowl";
      image: string;
      original: string;
      amount: number;
    }[];
  }[];
};
