// src/navigation/AppNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useWindowDimensions, Platform } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import IngredientScreen from '../screens/IngredientScreen';

export type RootStackParamList = {
  Home: undefined;
  Ingredient: { dishId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 400;

  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined}
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            fontSize: isSmallScreen ? 16 : 20,
            fontWeight: 'bold',
          },
          contentStyle: {
            paddingHorizontal: isSmallScreen ? 8 : 16,
            paddingBottom: Platform.OS === 'web' ? 20 : 0,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Party Menu' }}
        />
        <Stack.Screen
          name="Ingredient"
          component={IngredientScreen}
          options={{ title: 'Ingredients' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
