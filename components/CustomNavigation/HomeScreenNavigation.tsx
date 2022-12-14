import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import YahooScreen from "../../screens/YahooScreen/YahooScreen";


const Stack = createNativeStackNavigator();

const HomeScreenNavigator = () => {
    return (
        
            <Stack.Navigator>               

                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Yahoo" component={YahooScreen} options={{
                    headerTitleStyle: {
                        fontSize: 14,
                        fontWeight: "bold",
                    }
                }} />
                    
            </Stack.Navigator>
        
    );
}

export default HomeScreenNavigator;

