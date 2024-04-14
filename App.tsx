import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { HomeScreen } from "./src/screens/Home.Screen";
import { colors } from "./src/themes/colors";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MusicScreen } from "./src/screens/Music.Screen";
import { FavoriteScreen } from "./src/screens/Favorite.Screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HomeVector from "./assets/vectors/home.svg";
import HeartVector from "./assets/vectors/heart.svg";
import MusicVector from "./assets/vectors/music.svg";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"), // 400
    "Nunito-Bold": require("./assets/fonts/Nunito-SemiBold.ttf"), // 600
  });

  const onLayoutRootView = async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <NavigationContainer>
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
                tabBarIcon: ({ color, size, focused }) => (
                  <HomeVector
                    color={focused ? colors.primary : colors.lightGray}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Favorite"
              component={FavoriteScreen}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <HeartVector
                    color={focused ? colors.primary : colors.lightGray}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Music"
              component={MusicScreen}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <MusicVector
                    color={focused ? colors.primary : colors.lightGray}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    paddingVertical: 5,
  },
  safe: {
    flex: 1,
  },
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
