class Diary {
  id: string;
  food: string;
  description: string;
  calories: string;

  constructor(id: string, food: string, description: string, calories: string) {
    this.id = id;
    this.food = food;
    this.description = description;
    this.calories = calories;
  }
}
export default Diary;
