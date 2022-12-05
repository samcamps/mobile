import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddScreen from "../screens/AddScreen/AddScreen";
import PortfolioScreen from "../screens/PortfolioScreen/PortfolioScreen";

const Stack = createNativeStackNavigator();

const PortfolioScreenNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Portfolio2" component={PortfolioScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Add" component={AddScreen} options={{
                headerTitleStyle: {
                    fontSize: 14,
                    fontWeight: "bold",
                }
            }} />
        </Stack.Navigator>
    );
}

export default PortfolioScreenNavigator;                                                                                                                                                        