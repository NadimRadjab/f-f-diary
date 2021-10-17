class Meal {
  id: string;
  inPage: string;
  mealNumber: number;
  foods: {}[];
  calories: number;

  constructor(
    id: string,
    inPage: string,
    mealNumber: number,
    foods: [],
    calories: number
  ) {
    this.id = id;
    this.inPage = inPage;
    this.mealNumber = mealNumber;
    this.foods = foods;
    this.calories = calories;
  }
}
export default Meal;
