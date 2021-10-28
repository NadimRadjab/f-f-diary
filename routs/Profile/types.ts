import { Recipe } from "../../redux/features/Recipes/type";
import { WeeklyPlan } from "../../redux/features/WeeklyPlans/types";

export type ProfileBottomParamList = {
  Goals: undefined;
  Favorites: undefined;
  ProfileSettings: undefined;
};
export type GoalsParamList = {
  Progress: undefined;
  Calculator: undefined;
  Calories: {
    results: {
      calories: string;
      age: string;
      gender: string;
      height: string;
      weight: string;
      activity: string;
    };
  };
};
export type FavoritesParamList = {
  FavoritesItems: undefined;
  RecipeDetails: {
    recipe: Recipe;
  };
  PlanDetails: {
    planParams: {
      id: string;
      date: Date | string;
      isLoading?: boolean;
    };
    plan: WeeklyPlan[];
  };
};

export type FavoritesTopParamList = {
  Recipes: undefined;
  Plans: undefined;
};
export type ProfileStackParamList = {
  ProfileGeneral: undefined;
};
