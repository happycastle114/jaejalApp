import apiClient from "./index";

// 로그인 응답 타입
export interface LoginResponse {
  access_token: string;
}

// 로그인
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  console.log(`${username} ${password}`);
  const response = await apiClient.post<LoginResponse>(
    "/auth/login",
    {
      username: username.toString(),
      password: password.toString(),
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
};

// 회원가입 요청 타입
export interface RegisterRequest {
  username: string;
  fullname: string;
  telephone: string;
  latitude: number;
  longitude: number;
  password: string;
  cron_expression: string;
  address: string;
}

// 회원가입
export const register = async (data: RegisterRequest): Promise<void> => {
  console.log(
    `${data.username} ${data.fullname} ${data.telephone} ${data.password} ${data.address} ${data.latitude} ${data.longitude} ${data.cron_expression}`
  );
  await apiClient.post("/auth/register", data);
};

// 사용자 정보 타입
export interface UserInfo {
  username: string;
  fullname: string;
  telephone: string;
  mental_score: number;
  latitude: number;
  longitude: number;
  address: string;
  cron_expression: string;
}

// 사용자 정보 조회
export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await apiClient.get<UserInfo>("/auth/info");
  return response.data;
};
