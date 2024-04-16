import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeVector from "../../assets/vectors/home.svg";
import HeartVector from "../../assets/vectors/heart.svg";
import MusicVector from "../../assets/vectors/music.svg";
import { HomeScreen } from "../screens/Home.Screen";
import { FavoriteScreen } from "../screens/Favorite.Screen";
import { colors } from "../themes/colors";
import { MusicScreen } from "../screens/Music.Screen";

const Tab = createBottomTabNavigator();

export const TabRouter = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeVector color={focused ? colors.primary : colors.lightGray} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <HeartVector color={focused ? colors.primary : colors.lightGray} />
          ),
        }}
      />
      <Tab.Screen
        name="Music"
        component={MusicScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MusicVector color={focused ? colors.primary : colors.lightGray} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    width: "100%",
    height: 85,
    backgroundColor: colors.darkBlue,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    shadowColor: "#A8BACF",
    shadowOffset: {
      width: 2,
      height: -10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    borderTopWidth: 0,
  },
});
