class Meal {
  id: string;
  foods: {}[];
  calories: number;

  constructor(id: string, foods: [], calories: number) {
    this.id = id;
    this.foods = foods;
    this.calories = calories;
  }
}
export default Meal;
