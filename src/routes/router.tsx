import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./Routes";
import { TabRouter } from "./Tab.Router";
import { mainNavigationOptions } from "../configs/navigation.config";

const Stack = createNativeStackNavigator();

export const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.tab}
        screenOptions={mainNavigationOptions}
      >
        <Stack.Screen
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
          name={Routes.tab}
          component={TabRouter}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
