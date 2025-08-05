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
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Filter dishes by tab, veg/non-veg and search
  const filteredDishes = (dishes as Dish[]).filter(
    (dish) =>
      (!activeCategory || dish.mealType === activeCategory) &&
      (!dishType || dish.type === dishType) &&
      dish.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Toggle Add/Remove
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <View style={tailwind('flex-1 bg-white p-4')}>
      {/* Search Input */}
      <TextInput
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
        style={tailwind('border border-gray-300 rounded p-2 mb-4')}
      />

      {/* Tabs for Meal Types */}
      <Tabs
        active={activeCategory}
        onSelect={(cat) => setActiveCategory(cat)}
        selectedCounts={{
          Starter: selectedIds.filter(id => dishes.find(d => d.id === id)?.mealType === 'Starter').length,
          'Main Course': selectedIds.filter(id => dishes.find(d => d.id === id)?.mealType === 'Main Course').length,
          Dessert: selectedIds.filter(id => dishes.find(d => d.id === id)?.mealType === 'Dessert').length,
          Sides: selectedIds.filter(id => dishes.find(d => d.id === id)?.mealType === 'Sides').length,
        }}
      />

      {/* Veg / Non-Veg Toggle */}
      <View style={tailwind('flex-row justify-center mb-4')}>
        <TouchableOpacity
          onPress={() => setDishType(dishType === 'VEG' ? null : 'VEG')}
          style={tailwind(
            `px-4 py-2 rounded-full mr-2 ${
              dishType === 'VEG' ? 'bg-green-500' : 'bg-gray-200'
            }`
          )}
        >
          <Text style={tailwind(dishType === 'VEG' ? 'text-white' : 'text-black')}>
            Veg
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setDishType(dishType === 'NON_VEG' ? null : 'NON_VEG')}
          style={tailwind(
            `px-4 py-2 rounded-full ${
              dishType === 'NON_VEG' ? 'bg-red-500' : 'bg-gray-200'
            }`
          )}
        >
          <Text style={tailwind(dishType === 'NON_VEG' ? 'text-white' : 'text-black')}>
            Non-Veg
          </Text>
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
            onToggleSelect={() => toggleSelect(item.id)}
            isSelected={selectedIds.includes(item.id)}
          />
        )}
      />

      {/* Summary Footer */}
      {selectedIds.length > 0 && (
        <View style={tailwind('bg-white p-4 border-t border-gray-200')}>
          <Text style={tailwind('text-base text-black mb-2')}>
            Total Selected Dishes: {selectedIds.length}
          </Text>
          <TouchableOpacity style={tailwind('bg-blue-600 py-2 px-4 rounded')}>
            <Text style={tailwind('text-white text-center font-semibold')}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
