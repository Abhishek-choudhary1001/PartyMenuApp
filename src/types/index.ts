export interface Category {
    id: number;
    name: string;
    image: string;
    isRecommendedForMealSuggestion: boolean;
  }
  
  export interface Dish {
    id: number;
    name: string;
    type: string;
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
  }
  