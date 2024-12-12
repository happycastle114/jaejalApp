// RecordSummary.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";

export default function EasyRecordSummary() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput placeholder="날짜, 이름, 내용" style={styles.searchBox} />
        <Ionicons name="search" size={24} color="gray" />
      </View>
      <TouchableOpacity style={styles.recordButton}>
        <Text style={styles.recordButtonText}>기록 모음</Text>
      </TouchableOpacity>
      <Calendar
        style={styles.calendar}
        markedDates={{
          "2024-11-19": { selected: true, selectedColor: "#A6DAA6" },
          "2024-11-20": { selected: true, selectedColor: "#A6DAA6" },
        }}
      />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  recordButton: {
    backgroundColor: "#A6DAA6",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  recordButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  calendar: {
    marginBottom: 20,
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
