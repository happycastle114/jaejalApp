// DetailedRecord.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EasyDetailedRecord() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.dateText}>2024.11.19</Text>
      <Text style={styles.recordTitle}>소소한 행복</Text>
      <Text style={styles.recordContent}>
        오늘 아침에는 가벼운 바람이 불어 기분 좋게 하루를 시작했다. 미역국과
        밥으로 든든하게 아침을 먹고 가벼운 스트레칭을 했는데, 무릎 통증이 덜하니
        움직이는 게 훨씬 수월해진 것 같아 기분이 좋았다. ...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recordContent: {
    fontSize: 14,
    color: "#666",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 10,
    paddingBottom: 20,
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
