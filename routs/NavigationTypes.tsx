import { Recipe } from "../redux/features/Recipes/type";

export type DrawerParamList = {
  Home: {
    drawerTitle: string;
  };
  Profile: undefined;
  test: undefined;
};
export type DiaryParamList = {
  DiaryStack: undefined;
  FoodSearch: {
    mealId: string | undefined;
    data?: string;
    type?: string;
  };
  FoodScan: { mealId: string; data?: string };
  ScannedFoodDetails: undefined;
};

export type DiaryTopParamList = {
  Search: {
    mealId: string;
    data: string;
    type: string;
  };
  MyMeals: undefined;
};

export type BottomNavParamList = {
  Diary: undefined;
  Recipes: undefined;
  WeaklyPlans: undefined;
};
export type RecipieParamList = {
  RecipeStack: {
    drawerTitle: string;
  };
  RecipeDetails: {
    recipe: Recipe;
  };
};
export type WeaklyParamList = {
  weaklyPlansSearch: undefined;
  weeklyplan: undefined;
};
export type AuthParamList = {
  Login: undefined;
  Register: undefined;
};
