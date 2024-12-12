import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Diary } from "./utils/api/diary";
import { textToSpeech } from "./utils/api/tts";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { format } from "date-fns";

global.Buffer = require("buffer").Buffer;

export const textToClova = async (text: string) => {
  try {
    const response = await axios.post(
      "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts",
      {
        speaker: "nara",
        speed: "0",
        text: text,
        format: "wav",
      },
      {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": "",
          "X-NCP-APIGW-API-KEY": "",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        responseType: "arraybuffer",
      }
    );
    const audioBinary = response.data;

    // Save binary data to a temporary

    const audioPath = `${FileSystem.cacheDirectory}tts_audio2.wav`; // Adjust extension based on your API's audio format
    await FileSystem.writeAsStringAsync(
      audioPath,
      Buffer.from(audioBinary).toString("base64"),
      {
        encoding: "base64",
      }
    );
    console.log("Audio Path:", audioPath);

    return audioPath;

    // Play the audio file
  } catch (error) {
    console.error("Text-to-Speech Error:", error);
    alert("Error" + "Failed to convert text to speech.");
  }
};

const DiaryDetailScreen: React.FC = ({ route, navigation }: any) => {
  const { diary }: { diary: Diary } = route.params;

  const [sound, setSound] = React.useState<Audio.Sound | null>(null);

  const handleTextToSpeech = async (text: string) => {
    const audioPath = await textToClova(text);

    const { sound } = await Audio.Sound.createAsync({ uri: audioPath });

    setSound(sound);
    await sound.playAsync();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={async () => {
            await sound?.stopAsync();
            await sound?.unloadAsync();
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>기록</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Date Navigation */}
      <View style={styles.dateNavigation}>
        <Ionicons
          name="chevron-back-outline"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.dateText}>{diary.date}</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
      </View>

      {/* Diary Content */}
      <View style={styles.diaryContent}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>소소한 행복</Text>
          <TouchableOpacity>
            <Ionicons
              name="volume-high-outline"
              size={24}
              color="white"
              style={styles.speakerIcon}
              onPress={() => handleTextToSpeech(diary.content)}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text style={styles.content}>{diary.content}</Text>
        </ScrollView>
      </View>

      {/* Footer Navigation
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="notifications-outline" size={24} color="gray" />
          <Text style={styles.footerText}>동네 소식</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="call" size={24} color="green" />
          <Text style={styles.footerText}>전화</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="document-text-outline" size={24} color="gray" />
          <Text style={styles.footerText}>내 기록</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default DiaryDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSpacer: {
    width: 24, // 아이콘 공간 유지
  },
  dateNavigation: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  diaryContent: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  speakerIcon: {
    backgroundColor: "#4CAF50",
    padding: 6,
    borderRadius: 20,
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
    paddingTop: 10,
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
