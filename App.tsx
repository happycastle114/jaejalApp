import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import RegisterationScreen from "./RegisterationScreen";
import DiaryDetailScreen from "./DiaryDetailScreen";
import CombinedDiaryScreen from "./CombinedDiaryScreen";
import { RecoilRoot, useRecoilState } from "recoil";
import { loginState } from "./utils/recoil/atoms/loginState";
import { SettingScreen } from "./SettingScreen";
import EventScreen from "./EventScreen";
import EventDetailPage from "./EventDetailPage";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(); //Ignore all log notifications
import AddressInputScreen from "./AddressInputScreen";
import FontSizeSettingScreen from "./FontSizeSettingScreen";
import TimeSettingScreen from "./TimeSettingScreen";
import PhoneNumberScreen from "./PhoneNumberScreen";
import { Diary } from "./utils/api/diary";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Registeration: undefined;
  AddressInput: undefined;
  FontSize: undefined;
  TimeSettingScreen: undefined;
  PhoneNumberScreen: undefined;
  Setting: undefined;
  DiaryDetail: { diary: Diary };
  CombinedDiary: undefined;
  EventDetailPage: { item: Event };
  EventScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App2: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  useEffect(() => {}, [isLoggedIn]);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        const password = await AsyncStorage.getItem("password");
        setIsLoggedIn(!!(id && password));
      } catch (error) {
        console.error("Error loading login data", error);
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  if (isLoggedIn === null) {
    return null; // Render a loading screen if necessary
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DiaryDetail" component={DiaryDetailScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen
              name="CombinedDiary"
              component={CombinedDiaryScreen}
            />
            <Stack.Screen name="EventScreen" component={EventScreen} />
            <Stack.Screen name="EventDetailPage" component={EventDetailPage} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="AddressInput" component={AddressInputScreen} />
            <Stack.Screen name="FontSize" component={FontSizeSettingScreen} />
            <Stack.Screen
              name="TimeSettingScreen"
              component={TimeSettingScreen}
            />
            <Stack.Screen
              name="PhoneNumberScreen"
              component={PhoneNumberScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <App2 />
    </RecoilRoot>
  );
};
export default App;
