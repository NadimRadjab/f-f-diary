export const pages = [
  {
    date: "2021-10-14T09:33:15.577Z",
    id: "1",
    meals: [
      {
        calories: 0,
        foods: [
          {
            title: "Pizza Buddy: Frozen Pizza Dough, 16 Oz",
            servingsSize: 50,
            servingsNumber: 8,
            calories: 113,
          },
        ],
        id: "1",
      },
      {
        calories: 0,
        foods: [{ calories: 300 }],
        id: "2",
      },
      {
        calories: 0,
        foods: [],
        id: "3",
      },
      {
        calories: 0,
        foods: [],
        id: "4",
      },
      {
        calories: 0,
        foods: [],
        id: "5",
      },
      {
        calories: 0,
        foods: [],
        id: "6",
      },
    ],
    totalcal: 0,
  },
];

export const getMealCalories = (arr: any, id: string) => {
  let total;
  const page = arr.map((page: any) => {
    if (page.id === "1") {
      const foodArr = page.meals.map((meal: any) => {
        return meal.foods.reduce((prev: any, cur: any) => {
          return prev + cur.calories;
        }, 0);
      });
      total = foodArr.reduce((prev: number, cur: number) => {
        return prev + cur;
      }, 0);
    }
  });
  return total;
};
