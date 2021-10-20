export type DiaryParamList = {
  DiaryStack: undefined;
  FoodSearch: {
    mealId: string | undefined;
    data?: string;
    type?: string;
  };
  FoodScan: undefined;
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
