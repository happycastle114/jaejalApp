import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { userInfoState } from "./utils/recoil/atoms/userInfo";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Converts a cron expression to a human-readable time format.
 * @param {string} cronExpression - The cron expression in the format 'minute hour * * *'.
 * @returns {string} - The formatted time string.
 */
function cronToTime(cronExpression: string): string {
  const [minute, hour] = cronExpression.split(" ");

  // Ensure both minute and hour are two digits
  const formattedMinute = minute.padStart(2, "0");
  const formattedHour = hour.padStart(2, "0");

  return `${formattedHour}:${formattedMinute}`;
}

export function SettingScreen({ navigation }: { navigation: any }) {
  const [fontSizeIndex, setFontSizeIndex] = useState<number>(1);
  const [isEasyMode, setIsEasyMode] = useState<boolean>(false);
  const fontSizes = [10, 14, 18, 22, 26];
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 정보 관리</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* 회원 정보 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>회원 정보</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          <Text style={styles.infoText}>{userInfo?.fullname}</Text>
          <Ionicons name="pencil" size={16} color="gray" />
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>전화번호</Text>
          <Text style={styles.infoText}>{userInfo?.telephone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>주소</Text>
          <Text style={styles.infoText}>{userInfo?.address}</Text>
        </View>
      </View>

      {/* 글자 크기 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>글자 크기</Text>
        <View style={styles.fontSizeRow}>
          <Text style={styles.fontSizeLabel}>가</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={4}
            step={1}
            value={fontSizeIndex}
            onValueChange={(value) => setFontSizeIndex(value)}
            minimumTrackTintColor="#4CAF50"
            maximumTrackTintColor="#C7C7C7"
            thumbTintColor="#4CAF50"
          />
          <Text style={styles.fontSizeLabel}>가</Text>
        </View>
        <Text style={styles.previewText} fontSize={fontSizes[fontSizeIndex]}>
          미리보기 텍스트
        </Text>
      </View>

      {/* 전화 시간 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>전화 시간</Text>
        <View style={styles.timePicker}>
          <Text style={styles.timeText}>
            {cronToTime(userInfo!.cron_expression)}
          </Text>
        </View>
      </View>

      {/* 쉬운 사용 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>쉬운 사용</Text>
        <View style={styles.easyModeRow}>
          <Text style={styles.easyModeLabel}>
            화면 상의 항목들이 더 크게 표시되고, 항목의 사용법에 대한 간단한
            설명이 제공됩니다.
          </Text>
          <Switch
            value={isEasyMode}
            onValueChange={(value) => setIsEasyMode(value)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoText: {
    fontSize: 14,
  },
  fontSizeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  fontSizeLabel: {
    fontSize: 18,
    color: "#000",
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  previewText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  timePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 18,
  },
  timeToggle: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "bold",
  },
  easyModeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  easyModeLabel: {
    fontSize: 14,
    color: "#666",
    flexShrink: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingVertical: 10,
  },
  footerButton: {
    alignItems: "center",
  },
  footerButtonText: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
});

export default SettingScreen;
