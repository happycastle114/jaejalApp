import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type CallScreenProps = {
  navigation?: Navigator;
};

const CallScreen: React.FC = ({ navigation }: CallScreenProps) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

  return (
    <View style={styles.container}>
      {/* Settings Button */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={(_) => {
          navigation.navigate("Setting");
        }}
      >
        <FontAwesome name="cog" size={24} color="black" />
      </TouchableOpacity>

      {/* Call Icon */}
      <Image
        source={require("./assets/call-icon.png")}
        style={styles.callIcon}
      />
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  settingsButton: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  callIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  friendButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  friendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    width: "80%",
    padding: 10,
  },
  dropdownItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdownItemText: {
    fontWeight: "bold",
  },
  dropdownItemRelation: {
    color: "gray",
  },
});
