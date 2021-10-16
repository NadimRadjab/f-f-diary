class Food {
  id: string;
  totalcal: number;
  food: string;
  description: string;
  constructor(id: string, food: string, description: string, totalcal: number) {
    this.id = id;
    this.food = food;
    this.totalcal = totalcal;
    this.description = description;
  }
}
export default Food;
