import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import EventScreen from "./EventScreen";
import CallScreen from "./CallScreen";
import DiaryScreen from "./DiaryScreen";
import { SettingScreen } from "./SettingScreen";
import { useRecoilState } from "recoil";
import { easyModeState } from "./utils/recoil/atoms/easyModeState";
import EasyRecordSummary from "./EasyRecordSummary";

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  const [isEasyMode, setIsEasyMode] = useRecoilState(easyModeState);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconPath;
          let tintColor = focused ? "#32CD32" : "#A8A8A8"; // Green for active, gray for inactive

          switch (route.name) {
            case "동네 소식":
              iconPath = require("./assets/address-book.png");
              break;
            case "전화":
              iconPath = require("./assets/call.png");
              break;
            case "내 자서전":
              iconPath = require("./assets/diary.png");
              break;
          }

          return (
            <Image source={iconPath} style={[styles.icon, { tintColor }]} />
          );
        },
        tabBarActiveTintColor: "#32CD32",
        tabBarInactiveTintColor: "#A8A8A8",
      })}
    >
      <Tab.Screen name="동네 소식" component={EventScreen} />
      <Tab.Screen name="정보" component={CallScreen} />
      <Tab.Screen
        name="내 기록"
        component={isEasyMode ? EasyRecordSummary : DiaryScreen}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
