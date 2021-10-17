export interface Food {
  id: string;
  title: string;
  servingsSize: number;
  servingsNumber: number;
  calories: number;
}
export interface Meal {
  id: string;
  inPage: string;
  mealNumber: number;
  foods: Food[];
  calories: number;
}
export interface Page {
  id: string;
  date: string;
  meals: Meal[];
  totalcal: number;
}

export interface DiaryState {
  ownerId: string;
  id: string;
  pages: Page[];
  isLoading: boolean;
}
