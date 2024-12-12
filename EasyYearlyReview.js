// YearlyReview.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EasyYearlyReview() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.yearSelect}>
        <Text style={styles.myRecord}>나의</Text>
        <TouchableOpacity style={styles.yearButton}>
          <Text style={styles.yearText}>1년</Text>
        </TouchableOpacity>
        <Text style={styles.reviewText}>되짚어보기</Text>
      </View>
      <Text style={styles.yearContent}>
        올해는 건강에 조금 더 신경을 쓴 한 해였다. 무릎 통증이 있었지만, 꾸준히
        치료를 받으면서 상태가 많이 나아졌고 ...
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
  yearSelect: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  myRecord: {
    fontSize: 16,
  },
  yearButton: {
    backgroundColor: "#A6DAA6",
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginLeft: 5,
    marginRight: 5,
  },
  yearText: {
    color: "white",
    fontSize: 14,
  },
  reviewText: {
    fontSize: 16,
  },
  yearContent: {
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
