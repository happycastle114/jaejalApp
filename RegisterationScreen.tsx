import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const RegisterationScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>회원가입</Text>

      {/* Input Fields */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder="아이디"
          style={styles.inputHalf}
          placeholderTextColor="#A8A8A8"
        />
        <TextInput
          placeholder="이름"
          style={styles.inputHalf}
          placeholderTextColor="#A8A8A8"
        />
      </View>

      <TextInput
        placeholder="전화번호"
        style={styles.inputFull}
        placeholderTextColor="#A8A8A8"
      />
      <TextInput
        placeholder="비밀번호"
        secureTextEntry
        style={styles.inputFull}
        placeholderTextColor="#A8A8A8"
      />
      <TextInput
        placeholder="비밀번호 확인"
        secureTextEntry
        style={styles.inputFull}
        placeholderTextColor="#A8A8A8"
      />

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} disabled>
        <Text style={styles.registerButtonText}>가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputHalf: {
    width: "48%",
    borderBottomWidth: 1,
    borderBottomColor: "#32CD32",
    padding: 10,
    fontSize: 16,
  },
  inputFull: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#32CD32",
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: "#E0E0E0",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  registerButtonText: {
    color: "#A8A8A8",
    fontSize: 16,
  },
});
