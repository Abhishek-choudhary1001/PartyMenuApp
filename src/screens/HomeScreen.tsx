// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  useWindowDimensions,
} from 'react-native';
import { tailwind } from '../utils/tailwind';
import Tabs from '../components/tabs';
import DishCard from '../components/DishCard';
import dishesJson from '../data/dishes.json';
import type { Dish } from '../types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function HomeScreen(): JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 380;

  const [searchText, setSearchText] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [dishType, setDishType] = useState<'VEG' | 'NON_VEG' | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [readMoreDish, setReadMoreDish] = useState<Dish | null>(null);

  const dishes = dishesJson as Dish[];

  const filtered: Dish[] = dishes.filter((d) =>
    (!activeCategory || d.mealType === activeCategory) &&
    (!dishType || d.type === dishType) &&
    d.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleSelect = (id: number) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const selectedCounts: Record<string, number> = {
    Starter: selectedIds.filter((id) => dishes.find((d) => d.id === id)?.mealType === 'Starter').length,
    'Main Course': selectedIds.filter((id) => dishes.find((d) => d.id === id)?.mealType === 'Main Course').length,
    Dessert: selectedIds.filter((id) => dishes.find((d) => d.id === id)?.mealType === 'Dessert').length,
    Sides: selectedIds.filter((id) => dishes.find((d) => d.id === id)?.mealType === 'Sides').length,
  };

  return (
    <SafeAreaView style={tailwind('flex-1 bg-gray-50')}>
      {/* Search + Filters */}
      <View style={tailwind('px-4 pt-3')}>
        <TextInput
          placeholder="Search dish for your party..."
          value={searchText}
          onChangeText={setSearchText}
          style={[
            tailwind('bg-white rounded-xl px-4'),
            {
              height: isSmallScreen ? 42 : 48,
              borderWidth: 1,
              borderColor: '#e5e7eb',
              fontSize: isSmallScreen ? 13 : 15,
            },
          ]}
        />

        <Tabs active={activeCategory} onSelect={(cat) => setActiveCategory(cat)} selectedCounts={selectedCounts} />

        {/* Veg / Non-Veg Toggle */}
        <View style={tailwind('flex-row items-center justify-between px-1 mb-2')}>
          <Text
            style={[
              tailwind('text-gray-700'),
              { fontSize: isSmallScreen ? 12 : 14 },
            ]}
          >
            Main Courses Selected ({selectedCounts['Main Course']})
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => setDishType(dishType === 'VEG' ? null : 'VEG')}
              style={tailwind(`mr-2 px-2 py-1 rounded ${dishType === 'VEG' ? 'bg-emerald-500' : 'bg-gray-200'}`)}
            >
              <Text style={tailwind(dishType === 'VEG' ? 'text-white text-sm' : 'text-black text-sm')}>Veg</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDishType(dishType === 'NON_VEG' ? null : 'NON_VEG')}
              style={tailwind(`px-2 py-1 rounded ${dishType === 'NON_VEG' ? 'bg-red-500' : 'bg-gray-200'}`)}
            >
              <Text style={tailwind(dishType === 'NON_VEG' ? 'text-white text-sm' : 'text-black text-sm')}>Non-Veg</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Dish List */}
      <FlatList<Dish>
        data={filtered}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <DishCard
            dish={item}
            onPress={() => navigation.navigate('Ingredient', { dishId: item.id })}
            onToggleSelect={() => toggleSelect(item.id)}
            isSelected={selectedIds.includes(item.id)}
            onOpenReadMore={() => setReadMoreDish(item)}
          />
        )}
      />

      {/* Bottom Bar */}
      <View
        style={[
          tailwind('absolute bottom-0 left-0 right-0 bg-white px-4 py-3 border-t'),
          { height: isSmallScreen ? 64 : 74 },
        ]}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text
            style={[
              tailwind('font-medium'),
              { fontSize: isSmallScreen ? 14 : 16 },
            ]}
          >
            Total Dish Selected {selectedIds.length}
          </Text>
          <TouchableOpacity
            style={tailwind('bg-black px-5 py-3 rounded-full')}
            onPress={() => {
              /* continue action */
            }}
          >
            <Text style={tailwind('text-white font-semibold')}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Read More Modal */}
      <Modal visible={!!readMoreDish} animationType="slide" transparent>
        <View style={tailwind('flex-1 justify-end')}>
          <View
            style={[
              tailwind('bg-white rounded-t-2xl p-4'),
              { minHeight: height * 0.6 },
            ]}
          >
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={tailwind('text-lg font-semibold')}>{readMoreDish?.name}</Text>
              <TouchableOpacity onPress={() => setReadMoreDish(null)}>
                <Text style={tailwind('text-gray-600')}>Close</Text>
              </TouchableOpacity>
            </View>

            {/* Dish Image */}
            {readMoreDish?.image && (
              <Image
                source={{ uri: readMoreDish.image }}
                style={{
                  width: '100%',
                  height: isSmallScreen ? 130 : 160,
                  borderRadius: 12,
                  marginTop: 12,
                }}
                resizeMode="cover"
              />
            )}

            {/* Description */}
            <Text style={tailwind('text-sm text-gray-700 mt-3')}>
              {readMoreDish?.description}
            </Text>

            {/* Ingredients */}
            <View style={tailwind('mt-4')}>
              <Text style={tailwind('text-sm font-medium')}>Ingredients</Text>
              {(readMoreDish?.ingredients || []).map((ing: string, idx: number) => (
                <Text key={idx} style={tailwind('text-sm text-gray-700 mt-1')}>
                  • {ing}
                </Text>
              ))}
            </View>

            {/* Actions */}
            <View style={tailwind('flex-row justify-end mt-6')}>
              <TouchableOpacity
                style={tailwind('mr-3 px-4 py-2 bg-amber-500 rounded-full')}
                onPress={() => {
                  /* add remove */
                }}
              >
                <Text style={tailwind('text-white')}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setReadMoreDish(null)}
                style={tailwind('px-4 py-2 border rounded-full')}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
