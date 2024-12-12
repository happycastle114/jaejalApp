import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import axios from "axios";
import Postcode from "@actbase/react-daum-postcode";
import { useRecoilState } from "recoil";
import { registerInfoState } from "./utils/recoil/atoms/registerInfo";

const AddressInputScreen = ({ navigation }) => {
  const [address, setAddress] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [registerInfo, setRegisterInfo] = useRecoilState(registerInfoState);

  const handleAddressSelect = (data) => {
    console.log(data);
    setAddress(data.address);
    setModalVisible(false);
    fetchCoordinates(data.address);
  };

  const fetchCoordinates = async (selectedAddress) => {
    const encodedAddress = encodeURIComponent(selectedAddress);
    const apiUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodedAddress}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": "",
          "X-NCP-APIGW-API-KEY": "",
        },
      });

      if (response.data.addresses.length > 0) {
        const { x, y } = response.data.addresses[0];
        setCoordinates({ latitude: y, longitude: x });
      } else {
        alert("Error", "No coordinates found for the selected address.");
      }
    } catch (error) {
      console.error(error);
      alert("Error", "Failed to fetch coordinates.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>주소를 입력해주세요.</Text>
      <TextInput
        style={styles.input}
        placeholder="도로명 주소"
        value={address}
        onChangeText={setAddress}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>주소 검색</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setRegisterInfo({
            ...registerInfo,
            ...coordinates,
            address: address,
          });
          navigation.navigate("FontSize");
        }}
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <Postcode
          style={{ width: "100%", height: "100%" }}
          jsOptions={{ animation: true }}
          onSelected={handleAddressSelect}
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
      </Modal>
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
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AddressInputScreen;
