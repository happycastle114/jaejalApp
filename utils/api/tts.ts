import apiClient from "./index";

// 텍스트 음성 변환
export const textToSpeech = async (text: string): Promise<any> => {
  const response = await apiClient.post<any>("/voice/text-to-speech", null, {
    headers: {
      accept: "*/*",
    },
    params: {
      text,
    },
  });
  return response.data;
};
