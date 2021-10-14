class Page {
  id: string;
  date: string;
  totalcal: number;
  meals: [];
  constructor(id: string, date: string, meals: [], totalcal: number) {
    this.id = id;
    this.date = date;
    this.totalcal = totalcal;
    this.meals = meals;
  }
}
export default Page;
