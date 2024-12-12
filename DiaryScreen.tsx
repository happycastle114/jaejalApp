import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { Diary, getDiaries } from "./utils/api/diary";

// Define a custom type for the 'day' object
type Day = {
  dateString: string;
  day: number;
  month: number;
  year: number;
};

const DiaryScreen: React.FC = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [diaries, setDiaries] = useState<Diary[]>([
    {
      id: 23,
      user_id: 23,
      date: "2024-11-08",
      content: "반갑습니다. 안녕하세요",
    },
  ]);

  useEffect(() => {
    getDiaries().then((data) => setDiaries(data));
  }, []);

  // Explicitly type the 'day' parameter
  const handleDateSelect = (day: Day) => {
    for (let dr of diaries) {
      if (dr.date === day.dateString) {
        navigation.navigate("DiaryDetail", { diary: dr });
        return;
      }
    }
    alert("해당 일자의 일기가 존재하지 않습니다!");
  };

  const handleCombinedDiary = () => {
    navigation.navigate("CombinedDiary");
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FontAwesome name="microphone" size={24} color="#A8A8A8" />
      </View>

      {/* 통합 자서전 Button */}
      <TouchableOpacity
        style={styles.combinedDiaryButton}
        onPress={handleCombinedDiary}
      >
        <Text style={styles.combinedDiaryButtonText}>기록 모음</Text>
      </TouchableOpacity>

      {/* Calendar */}
      <Calendar
        onDayPress={(day: Day) => handleDateSelect(day)}
        markedDates={diaries.reduce((prev, item) => {
          prev[item.date] = { selected: true, selectedColor: "#32CD32" };
          return prev;
        }, {} as Record<string, { selected: boolean; selectedColor: string }>)}
        theme={{
          selectedDayBackgroundColor: "#32CD32",
          todayTextColor: "#32CD32",
        }}
      />
    </View>
  );
};

export default DiaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 5,
  },
  combinedDiaryButton: {
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 5,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  combinedDiaryButtonText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
});
