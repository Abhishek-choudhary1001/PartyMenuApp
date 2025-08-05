import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { tailwind } from '../utils/tailwind';
import Tabs from '../components/Tabs';
import DishCard from '../components/DishCard';
import dishes from '../data/dishes.json';
import type { Dish } from '../types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [dishType, setDishType] = useState<'VEG' | 'NON_VEG' | null>(null);

  const filteredDishes = (dishes as Dish[]).filter(
    (dish) =>
      (!activeCategory || dish.mealType === activeCategory) &&
      (!dishType || dish.type === dishType) &&
      dish.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={tailwind('flex-1 bg-white p-4')}>
      <TextInput
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
        style={tailwind('border border-gray-300 rounded p-2 mb-4')}
      />

      <Tabs active={activeCategory} onSelect={setActiveCategory} />

      {/* Veg / Non-Veg Toggle */}
      <View style={tailwind('flex-row justify-center mb-4')}>
        <TouchableOpacity
          onPress={() => setDishType(dishType === 'VEG' ? null : 'VEG')}
          style={tailwind(
            `px-4 py-2 rounded-full mr-2 ${
              dishType === 'VEG' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`
          )}
        >
          <Text style={tailwind(dishType === 'VEG' ? 'text-white' : 'text-black')}>Veg</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setDishType(dishType === 'NON_VEG' ? null : 'NON_VEG')}
          style={tailwind(
            `px-4 py-2 rounded-full ${
              dishType === 'NON_VEG' ? 'bg-red-500 text-white' : 'bg-gray-200'
            }`
          )}
        >
          <Text style={tailwind(dishType === 'NON_VEG' ? 'text-white' : 'text-black')}>Non-Veg</Text>
        </TouchableOpacity>
      </View>

      {/* Dish List */}
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DishCard
            dish={item}
            onPress={() => navigation.navigate('Ingredient', { dishId: item.id })}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;
