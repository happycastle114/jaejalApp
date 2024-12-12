import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = ""; // API의 기본 URL
const TOKEN_STORAGE_KEY = ""; // 토큰 저장 키

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청에 토큰 추가
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 토큰 저장 및 가져오기 유틸리티
export const setAuthToken = async (token) => {
  await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const getAuthToken = async () => {
  return await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
};

export const removeAuthToken = async () => {
  await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
};

export default apiClient;
