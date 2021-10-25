export type ProgressData = {
  calories?: string;
  currentWeight?: string;
  goalWeight?: string;
  startingWeight?: {
    weight: string;
    date?: Date | undefined | string | number;
  };
};
