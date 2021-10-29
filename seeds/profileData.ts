import { PersonalData, ProgressData } from "../redux/features/Profile/types";

interface ProfileData {
  date: Date | string | undefined;
  profileId: string;
  favorites: {
    recipes: [];
    plans: [];
  };
  personalData: PersonalData;
  items: {};
  progressData: ProgressData;
}
export const profileData: ProfileData = {
  date: new Date().toISOString(),
  profileId: "",
  favorites: {
    recipes: [],
    plans: [],
  },
  personalData: {
    name: "",
    image: "",
    email: "",
    message: "",
    number: "",
  },
  items: {},
  progressData: {
    startingWeight: {
      weight: "",
      date: "",
    },
    currentWeight: [],
  },
};
