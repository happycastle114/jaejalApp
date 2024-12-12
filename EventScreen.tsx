import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./App";
import { useRecoilState } from "recoil";
import { easyModeState } from "./utils/recoil/atoms/easyModeState";
import { userInfoState } from "./utils/recoil/atoms/userInfo";
import { fetchEventsNearby, fetchFacilitiesNearby } from "./utils/api/events";

export type Event = {
  id: string;
  name: string;
  summary?: string;
  fullContent: string;
  startDate: Date;
  endDate: Date;
  tel?: string;
  address?: {
    addr: string;
    lat: Float;
    long: Float;
  };
  pictureUrl?: string;
};

const EventScreen: React.FC = () => {
  const [userInfo, _] = useRecoilState(userInfoState);

  const [fac, setFac] = useState<Event[]>([
    {
      id: "1",
      name: "아하기싫다",
      summary: "술마시고싶어요",
      fullContent:
        "유성 국화페스티벌은 국화 본연의 정취와 다양한 볼거리로 대전의 대표적인 축제로 자리매김하여 2010년 제1회를 시작으로 올해(2024)로 15회째를 맞고 있습니다.다륜대작, 현애작, 가든멈 등 국화 20만본 및 대형버섯, 동물, 국화폭포 조형물, LED거리, 각종 포토존 등 다양한 볼거리 및 체험행사 등을 제공하고 있습니다. 유성 국화페스티벌은 국화 본연의 정취와 다양한 볼거리로 대전의 대표적인 축제로 자리매김하여 2010년 제1회를 시작으로 올해(2024)로 15회째를 맞고 있습니다.다륜대작, 현애작, 가든멈 등 국화 20만본 및 대형버섯, 동물, 국화폭포 조형물, LED거리, 각종 포토존 등 다양한 볼거리 및 체험행사 등을 제공하고 있습니다.",
      startDate: new Date(2024, 10, 31),
      endDate: new Date(2024, 11, 20),
      tel: "010-0000-0000",
      address: {
        addr: "대전광역시 유성구 농대로17번길 7 (궁동)",
        lat: 36.361979653,
        long: 127.352487291,
      },
      pictureUrl:
        "https://pds.medicaltimes.com/Thumnail/20220414/1649901826.jpg",
    },
    {
      id: "2",
      name: "테스트를 해보자",
      fullContent: "summary가 없어요",
      startDate: new Date(2024, 10, 31),
      endDate: new Date(2024, 11, 20),
      tel: "",
      address: {
        addr: "대전광역시 유성구 대학로 291 (구성동)",
        lat: 36.371677859,
        long: 127.365169705,
      },
    },
    {
      id: "3",
      name: "얘는 안보이는게 정상",
      fullContent: "summary가 없어요",
      startDate: new Date(2024, 10, 31),
      endDate: new Date(2024, 11, 20),
      tel: "010-0000-0000",
      address: {
        addr: "대전광역시 유성구 대학로 291 (구성동)",
        lat: 36.371677859,
        long: 127.365169705,
      },
    },
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      name: "아하기싫다",
      summary: "술마시고싶어요",
      fullContent:
        "유성 국화페스티벌은 국화 본연의 정취와 다양한 볼거리로 대전의 대표적인 축제로 자리매김하여 2010년 제1회를 시작으로 올해(2024)로 15회째를 맞고 있습니다.다륜대작, 현애작, 가든멈 등 국화 20만본 및 대형버섯, 동물, 국화폭포 조형물, LED거리, 각종 포토존 등 다양한 볼거리 및 체험행사 등을 제공하고 있습니다. 유성 국화페스티벌은 국화 본연의 정취와 다양한 볼거리로 대전의 대표적인 축제로 자리매김하여 2010년 제1회를 시작으로 올해(2024)로 15회째를 맞고 있습니다.다륜대작, 현애작, 가든멈 등 국화 20만본 및 대형버섯, 동물, 국화폭포 조형물, LED거리, 각종 포토존 등 다양한 볼거리 및 체험행사 등을 제공하고 있습니다.",
      startDate: new Date(2024, 10, 31),
      endDate: new Date(2024, 11, 20),
      tel: "010-0000-0000",
      address: {
        addr: "대전광역시 유성구 농대로17번길 7 (궁동)",
        lat: 36.361979653,
        long: 127.352487291,
      },
      pictureUrl:
        "https://pds.medicaltimes.com/Thumnail/20220414/1649901826.jpg",
    },
    {
      id: "2",
      name: "테스트를 해보자",
      fullContent: "summary가 없어요",
      startDate: new Date(2024, 10, 31),
      endDate: new Date(2024, 11, 20),
      tel: "",
      address: {
        addr: "대전광역시 유성구 대학로 291 (구성동)",
        lat: 36.371677859,
        long: 127.365169705,
      },
    },
    {
      id: "3",
      name: "얘는 안보이는게 정상",
      fullContent: "summary가 없어요",
      startDate: new Date(2024, 10, 31),
      endDate: new Date(2024, 11, 20),
      tel: "010-0000-0000",
      address: {
        addr: "대전광역시 유성구 대학로 291 (구성동)",
        lat: 36.371677859,
        long: 127.365169705,
      },
    },
  ]);

  useEffect(() => {
    fetchEventsNearby(userInfo!.latitude, userInfo!.longitude)
      .then((data) =>
        setEvents(
          data.map((item) => {
            return {
              id: item.id.toString(),
              name: item.event_name,
              summary: item.description,
              fullContent: item.additional_description || "",
              startDate: new Date(item.start_date),
              endDate: new Date(item.end_date),
              tel: item.price ? item.price.toString() : undefined,
              address: {
                addr: item.address.address,
                lat: item.address.latitude,
                long: item.address.longitude,
              },
            } as Event;
          }) as Event[]
        )
      )
      .catch((error) => console.error(error));
    fetchFacilitiesNearby(userInfo!.latitude, userInfo!.longitude)
      .then((data) =>
        setFac(
          data.map((item) => {
            return {
              id: item.id.toString(),
              name: item.facility_name,
              summary: item.additional_description,
              fullContent: item.additional_description || "",
              startDate: new Date(),
              endDate: new Date(),
              tel: item.telephone,
              address: {
                addr: item.address.address,
                lat: item.address.latitude,
                long: item.address.longitude,
              },
            } as Event;
          }) as Event[]
        )
      )
      .catch((error) => console.error(error));
  }, []);
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "EventDetailPage">>();

  const [seeAll1, setSeeAll1] = useState<Boolean>(false);
  const [seeAll2, setSeeAll2] = useState<Boolean>(false);

  const [isEasyMode, setIsEasyMode] = useRecoilState(easyModeState);
  const dynamicStyles = getDynamicStyles(isEasyMode);

  // 클릭 이벤트 핸들러
  const handleItemPress = (item: Event) => {
    console.log(`이벤트: ${item.name} ${item.summary} ${item.address}`);
    navigation.navigate("EventDetailPage", {
      data: item,
    });
  };

  const handleMorePress1 = () => {
    setSeeAll1(!seeAll1);
  };

  const handleMorePress2 = () => {
    setSeeAll2(!seeAll2);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 나들이 */}
      <View style={styles.eventContatiner}>
        <Text style={dynamicStyles.title}>나들이</Text>
        <FlatList
          data={seeAll1 ? events : events.slice(0, 2)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleItemPress(item)}
              style={dynamicStyles.eventItem}
            >
              <Text style={dynamicStyles.eventName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 30 }}
          scrollEnabled={false}
        />
        <View style={styles.moreButtonContainer}>
          <TouchableOpacity
            onPress={handleMorePress1}
            style={dynamicStyles.moreButton}
          >
            <Text style={dynamicStyles.moreInfo}>
              {seeAll1 ? "접기" : "더보기"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* 배움터 */}
      <View style={styles.eventContatiner}>
        <Text style={dynamicStyles.title}>배움터</Text>
        <FlatList
          data={seeAll2 ? fac : fac.slice(0, 2)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleItemPress(item)}
              style={dynamicStyles.eventItem}
            >
              <Text style={dynamicStyles.eventName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 30 }}
          scrollEnabled={false}
        />
        <View style={styles.moreButtonContainer}>
          <TouchableOpacity
            onPress={handleMorePress2}
            style={dynamicStyles.moreButton}
          >
            <Text style={dynamicStyles.moreInfo}>
              {seeAll2 ? "접기" : "더보기"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  eventContatiner: {
    backgroundColor: "#fff",
    flexDirection: "column",
    paddingBottom: 40,
  },
  moreButtonContainer: {
    alignItems: "center",
  },
});

const getDynamicStyles = (isEasyMode: boolean) => ({
  eventItem: {
    backgroundColor: "rgba(96, 198, 81, 0.2)",
    padding: 15,
    minHeight: isEasyMode ? 120 : 100,
    borderRadius: isEasyMode ? 12 : 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  moreButton: {
    backgroundColor: "#fff",
    borderColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 12,
    borderWidth: 1,
    height: isEasyMode ? 60 : 45,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: isEasyMode ? 32 : 28,
    fontWeight: "bold",
  },
  eventName: {
    fontSize: isEasyMode ? 28 : 20,
    fontWeight: "bold",
  },
  moreInfo: {
    fontSize: isEasyMode ? 20 : 16,
    fontWeight: "regular",
  },
});
