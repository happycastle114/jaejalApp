import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "./App";

type Props = StackScreenProps<RootStackParamList>;

export default function CombinedDiaryScreen({ navigation }: Props) {
  const [selectedYear, setSelectedYear] = useState<string>("1y");

  const yearOptions = [
    { label: "1년", value: "1y" },
    { label: "2년", value: "2y" },
    { label: "3년", value: "3y" },
    { label: "5년", value: "5y" },
  ];

  console.log(selectedYear);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>기록 모음</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Filter Options */}
      <View style={styles.filterRow}>
        <Text style={styles.filterText}>나의</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedYear(value)}
          items={yearOptions}
          placeholder={yearOptions[0]}
          value={selectedYear}
          style={{
            inputAndroid: styles.dropdown,
            inputIOS: styles.dropdown,
          }}
        />
        <TouchableOpacity>
          <Text style={styles.filterAction}>되짚어보기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.speakerButton}>
          <Ionicons name="volume-high-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Record List */}
      <ScrollView style={styles.recordList}>
        <View style={styles.recordCard}>
          <Text style={styles.content}>
            올해는 건강에 조금 더 신경을 쓴 한 해였다. 무릎 통증이 있었지만,
            꾸준히 치료를 받으면서 상태가 많이 나아졌고, 식습관에도 신경을 쓰며
            균형 잡힌 음식을 선택하려고 노력했다. 통증이 줄어들고 나니 활동하는
            데도 자신감이 생겼다.
          </Text>
        </View>
        <View style={styles.recordCard}>
          <Text style={styles.content}>
            기억에 남는 일들 중 하나는 지역에서 열린 다양한 행사들이다. 특히
            걷기 대회에서 새로운 사람들과 운동하며 대화를 나눌 수 있었다.
            이런...
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSpacer: {
    width: 24, // 아이콘 공간 유지
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 16,
  },
  dropdown: {
    width: 120,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#F5F5F5",
    padding: 8,
    borderRadius: 8,
    marginRight: 16,
  },
  filterAction: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginRight: 16,
  },
  speakerButton: {
    marginLeft: "auto",
  },
  recordList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  recordCard: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
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
  footerText: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
});
