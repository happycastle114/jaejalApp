import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRecoilState } from "recoil";
import { registerInfoState } from "./utils/recoil/atoms/registerInfo";
import { register, RegisterRequest } from "./utils/api/auth";
import { RootStackParamList } from "./App";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<RootStackParamList>;

const PhoneNumberScreen: React.FC<Props> = ({ navigation }) => {
  const [part1, setPart1] = useState<string>("010");
  const [part2, setPart2] = useState<string>("");
  const [part3, setPart3] = useState<string>("");

  const [registerInfo, setRegisterInfo] = useRecoilState(registerInfoState);
  const handleNext = () => {
    const phoneNumber = `+8210${part2}${part3}`;
    setRegisterInfo({ ...registerInfo, telephone: phoneNumber });
    navigation.navigate("TimeSettingScreen");
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>전화번호를 입력해주세요.</Text>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={part1}
          maxLength={3}
          keyboardType="number-pad"
          onChangeText={setPart1}
        />
        <Text style={styles.separator}>-</Text>
        <TextInput
          style={styles.input}
          value={part2}
          maxLength={4}
          keyboardType="number-pad"
          onChangeText={setPart2}
        />
        <Text style={styles.separator}>-</Text>
        <TextInput
          style={styles.input}
          value={part3}
          maxLength={4}
          keyboardType="number-pad"
          onChangeText={setPart3}
        />
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  input: {
    width: 60,
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  separator: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
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

export default PhoneNumberScreen;
