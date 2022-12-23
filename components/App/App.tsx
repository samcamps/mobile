import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from '@expo/vector-icons';
import SearchScreen from '../../screens/SearchScreen/SearchScreen';
import HomeScreenNavigator from '../CustomNavigation/HomeScreenNavigation';
import PortfolioScreenNavigator from '../CustomNavigation/PortfolioScreenNavigation';

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Favorites" component={HomeScreenNavigator} options={{  
          tabBarIcon: ({ color, size }) => <FontAwesome name="star" size={22} color="black" />
        }}
        />
        <Tab.Screen name="Search" component={SearchScreen} options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="search" size={22} color="black" />
        }}
        />
        <Tab.Screen name="Portfolio" component={PortfolioScreenNavigator} options={{
          tabBarIcon: ({ color, size }) => <Foundation name="dollar-bill" size={32} color="black" /> 
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
