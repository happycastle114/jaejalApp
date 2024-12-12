import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { RootStackParamList } from "./App";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { format } from "date-fns";
import { useRecoilState } from "recoil";
import { easyModeState } from "./utils/recoil/atoms/easyModeState";

const EventDetailPage = ({ route }: { route: any }) => {
  const { data } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  console.log(data.address);

  const [isEasyMode, setIsEasyMode] = useRecoilState(easyModeState);
  const dynamicStyles = getDynamicStyles(isEasyMode);

  const handlePress = () => {
    console.log("Overlay button pressed!");
    console.log(data.tel);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {data.tel ? (
          <TouchableOpacity
            style={dynamicStyles.overlayButton}
            onPress={handlePress}
          >
            <Text style={dynamicStyles.buttonText}>전화로 신청하기</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.leftItem}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              style={styles.leftItem}
            />
          </TouchableOpacity>
          <Text style={dynamicStyles.titleText}>제목</Text>
        </View>
        <ScrollView style={styles.section}>
          {data.pictureUrl ? (
            <Image
              source={{ uri: data.pictureUrl }} // 이미지 URL을 uri로 전달
              style={styles.image}
            />
          ) : (
            <></>
          )}
          <Text style={dynamicStyles.nameText}>{data.name}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoDetail}>
              <Text style={dynamicStyles.infoTitle}>일시</Text>
              <Text style={dynamicStyles.infoContents}>{`${format(
                data.startDate,
                "yyyy.MM.dd"
              )} ~ ${format(data.endDate, "yyyy.MM.dd")}`}</Text>
            </View>
            <View style={styles.infoDetail}>
              <Text style={dynamicStyles.infoTitle}>장소</Text>
              <Text style={dynamicStyles.infoContents}>
                {data.address.addr}
              </Text>
            </View>
            <View style={styles.mapContainer}>
              {/* TODO : Add Google Map */}
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                  latitude: data.address.lat,
                  longitude: data.address.long,
                  /* TODO: check delta */
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: data.address.lat,
                    longitude: data.address.long,
                  }}
                  /* TODO : pin customize
                    image={{uri: 'assets/custom_pin.png'}} */
                />
              </MapView>
            </View>
            <View style={styles.infoDetail}>
              <Text style={dynamicStyles.infoTitle}>설명</Text>
              <Text style={dynamicStyles.infoContents}>{data.fullContent}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flexDirection: "column",
  },
  section: {
    flexGrow: 1,
    width: "100%",
    flexDirection: "column",
  },
  mapContainer: {
    height: 200,
    width: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: "100%",
  },
  leftItem: {
    position: "absolute",
    left: 10,
    justifyContent: "center",
  },
  image: {
    /* TODO : 이미지 사이즈 확인 */
    height: 300,
    justifyContent: "center",
    bottom: 25,
  },
  infoContainer: {
    padding: 30,
    gap: 20,
    flexDirection: "column",
  },
  infoDetail: {
    flexDirection: "row",
    gap: 20,
    alignItems: "flex-start",
    paddingRight: 60,
  },
  buttonContainer: {
    height: 100,
  },
});

const getDynamicStyles = (isEasyMode: boolean) => ({
  titleText: {
    fontSize: isEasyMode ? 28 : 24,
    fontWeight: "bold",
  },
  infoTitle: {
    fontSize: isEasyMode ? 24 : 20,
    fontWeight: "bold",
  },
  infoContents: {
    fontSize: isEasyMode ? 24 : 20,
    fontWeight: "regular",
  },
  nameText: {
    paddingLeft: 30,
    fontSize: isEasyMode ? 28 : 24,
    fontWeight: "bold",
    color: "#60C651",
  },
  overlayButton: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    height: isEasyMode ? 90 : 70, // Button height
    borderRadius: 12, // Makes the button round
    backgroundColor: "#60C651",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  buttonText: {
    fontSize: isEasyMode ? 24 : 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default EventDetailPage;
