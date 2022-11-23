import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './HomeScreens';
import SearchScreen from './SearchScreen';
import PortfolioScreen from './PortfolioScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Favorites" component={HomeScreen} options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="bank-transfer" size={33} color="black" />
        }}
        />
        <Tab.Screen name="Search" component={SearchScreen} options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="search" size={23} color="black" />
        }}
        />
        <Tab.Screen name="Portfolio" component={PortfolioScreen} options={{
          tabBarIcon: ({ color, size }) => <Foundation name="dollar-bill" size={32} color="black" />
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
