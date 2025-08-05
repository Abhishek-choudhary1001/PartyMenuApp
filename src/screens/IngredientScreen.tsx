import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { tailwind } from '../utils/tailwind';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import dishes from '../data/dishes.json';
import type { Dish } from '../types';

const mockIngredients = [
  "Paneer - 200g",
  "Onions - 1 large, chopped",
  "Capsicum - 1 medium, chopped",
  "Tomatoes - 2 pureed",
  "Ginger-Garlic paste - 1 tbsp",
  "Spices - Coriander, Red chili, Garam masala",
  "Salt to taste",
  "Oil"
];

type IngredientRouteProp = RouteProp<RootStackParamList, 'Ingredient'>;

const IngredientScreen = () => {
  const route = useRoute<IngredientRouteProp>();
  const { dishId } = route.params;

  const dish = (dishes as Dish[]).find(d => d.id === dishId);

  if (!dish) {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <Text style={tailwind('text-red-500 text-lg')}>Dish not found</Text>
      </View>
    );
  }

  return (
    <View style={tailwind('flex-1 bg-white p-4')}>
      <Text style={tailwind('text-2xl font-bold mb-2 text-black')}>
        {dish.name}
      </Text>
      <Text style={tailwind('text-base text-gray-600 mb-4')}>
        {dish.description}
      </Text>

      <Text style={tailwind('text-xl font-semibold mb-2 text-black')}>
        Ingredients
      </Text>

      <FlatList
        data={mockIngredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={tailwind('text-base text-gray-800 mb-2')}>• {item}</Text>
        )}
      />
    </View>
  );
};

export default IngredientScreen;
