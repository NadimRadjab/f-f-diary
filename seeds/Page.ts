class Page {
  id: string;
  date: string;
  totalcal: number;
  meals: { id: string; foods: {}[]; calories: number }[];
  constructor(
    id: string,
    date: string,
    meals: { id: string; foods: {}[]; calories: number }[],
    totalcal: number
  ) {
    this.id = id;
    this.date = date;
    this.totalcal = totalcal;
    this.meals = meals;
  }
}
export default Page;
