import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { getProfile, login } from "@react-native-seoul/kakao-login";
import { login as apiLogin, getUserInfo } from "./utils/api/auth";
import { useRecoilState } from "recoil";
import { loginState } from "./utils/recoil/atoms/loginState";
import { userInfoState } from "./utils/recoil/atoms/userInfo";
import { registerInfoState } from "./utils/recoil/atoms/registerInfo";
import { RootStackParamList } from "./App";
import { setAuthToken } from "./utils/api";

type Props = StackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [registerInfo, setRegisterInfo] = useRecoilState(registerInfoState);

  const handleLogin = async () => {
    const token = await login();
    const profile = await getProfile();

    console.log(profile);

    apiLogin(profile.id.toString(), profile.id.toString())
      .then(async (response) => {
        console.log(response);
        await setAuthToken(response.access_token);

        getUserInfo().then(async (response) => {
          setUserInfo(response);
          setIsLoggedIn(true);
        });
      })
      .catch((error) => {
        console.log(error);

        setRegisterInfo({
          username: profile.id.toString(),
          password: profile.id.toString(),
          fullname: profile.nickname,
        });

        navigation.navigate("AddressInput");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.hiddenTitle}>로그인</Text>
      <Image
        source={require("./assets/logo.png")} // Replace with your image path
        style={styles.logo}
      />
      <TouchableOpacity style={styles.kakaoButton} onPress={handleLogin}>
        <Image
          source={require("./assets/kakao_login.png")} // Replace with Kakao icon path
          style={styles.kakaoIcon}
        />
        <Text style={styles.kakaoButtonText}>카카오 로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  hiddenTitle: {
    fontSize: 1, // Keep this for accessibility but make it invisible
    color: "transparent",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  kakaoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE500",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: "80%",
    justifyContent: "center",
    elevation: 2, // For shadow effect
  },
  kakaoIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  kakaoButtonText: {
    color: "#3C1E1E",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
