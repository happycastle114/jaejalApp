import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRecoilState } from "recoil";
import { registerInfoState } from "./utils/recoil/atoms/registerInfo";
import { register } from "./utils/api/auth";

const TimeSettingScreen = () => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [registerInfo, setRegisterInfo] = useRecoilState(registerInfoState);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(false);
    setTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>전화 받을 시간을 설정해주세요.</Text>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
        <Text>{time.toLocaleTimeString("ko-KR")}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const hours = time.getHours();
          const minutes = time.getMinutes();

          // Format as cron expression
          const cron = `${minutes} ${hours} * * *`;
          setRegisterInfo({ ...registerInfo, cron_expression: cron });

          register({ ...registerInfo, cron_expression: cron })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
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
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default TimeSettingScreen;
