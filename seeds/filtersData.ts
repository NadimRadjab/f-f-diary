import { v4 as uuid4 } from "uuid";
const filtersData = [
  {
    id: uuid4(),
    title: "Vegan",
    color: "#10b981",
    isSelected: false,
  },
  {
    id: uuid4(),
    title: "Vegetarian",
    color: "#34d399",
    isSelected: false,
  },
  {
    id: uuid4(),
    title: "Ketogenic",
    color: "#f43f5e",
    isSelected: false,
  },
  {
    id: uuid4(),
    title: "Gluten Free",
    color: "#fdba74",
    isSelected: false,
  },
  {
    id: uuid4(),
    title: "Primal",
    color: "#22d3ee",
    isSelected: false,
  },
];
export default filtersData;
