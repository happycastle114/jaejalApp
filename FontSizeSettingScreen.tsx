import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "./App";
import { registerInfoState } from "./utils/recoil/atoms/registerInfo";
import { useRecoilState } from "recoil";

type Props = StackScreenProps<RootStackParamList>;

const FontSizeSettingScreen: React.FC<Props> = ({ navigation }) => {
  // 글자 크기 단계 (5단계)
  const fontSizes = [10, 14, 18, 22, 26];
  const [currentIndex, setCurrentIndex] = useState<number>(1); // 기본 2번째 단계 (14)
  const [registerInfo, setRegisterInfo] = useRecoilState(registerInfoState);

  const handleSliderChange = (value: number) => {
    // 슬라이더 값을 0~4의 정수 값으로 변환
    const index = Math.round(value);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>글자 크기를 설정해주세요.</Text>
      <Text style={[styles.sampleText, { fontSize: fontSizes[currentIndex] }]}>
        가나다라마바사
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={4} // 슬라이더 범위: 0 ~ 4
        step={1} // 정수 단계로만 이동
        value={currentIndex} // 현재 단계 값
        onValueChange={handleSliderChange} // 슬라이더 값 변경 처리
        minimumTrackTintColor="#4CAF50"
        maximumTrackTintColor="#C7C7C7"
        thumbTintColor="#4CAF50"
      />
      <View style={styles.fontSizeLabels}>
        <Text style={styles.labelText}>가</Text>
        <Text style={styles.labelText}>가</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          alert(`선택한 글자 크기: ${fontSizes[currentIndex]}`);
          setRegisterInfo({
            ...registerInfo,
            fontSize: fontSizes[currentIndex],
          });
          navigation.navigate("PhoneNumberScreen");
        }}
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  sampleText: {
    marginBottom: 20,
  },
  slider: {
    width: "80%",
    height: 40,
  },
  fontSizeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 10,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  button: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FontSizeSettingScreen;
