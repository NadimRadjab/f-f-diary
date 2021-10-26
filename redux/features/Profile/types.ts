export type ProgressData = {
  currentCalories?: string | number;
  currentWeight?: {
    weight?: string | number;
    date?: Date;
  }[];
  goalWeight?: string;
  startingWeight: {
    weight: string;
    date: Date | undefined | string | number;
  };
};
