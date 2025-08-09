export interface Category {
  id: number;
  name: string;
  image: string;
  isRecommendedForMealSuggestion: boolean;
}

export interface Dish {
  id: number;
  name: string;
  type: string; // 'VEG' | 'NON_VEG' would be more specific if possible
  mealType: string;
  dishType: string;
  description: string;
  image: string | null;
  categoryId: number;
  category: Category;
  forChefit: boolean;
  forParty: boolean;
  nameHi: string;
  nameBn: string;

 
  ingredients?: string[];
}
