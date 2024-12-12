import apiClient from "./index";

// 일기 타입
export interface Diary {
  id: number;
  user_id: number;
  date: string;
  content: string;
}

export interface Diaries {
  diaries: Diary[];
}

// 모든 일기 조회
export const getDiaries = async (): Promise<Diary[]> => {
  const response = await apiClient.get<Diaries>("/diary");

  return response.data.diaries;
};

// 특정 날짜의 일기 조회
export const getDiaryByDate = async (date: string): Promise<Diary> => {
  const response = await apiClient.get<Diary>("/diary/date", {
    params: { date },
  });
  return response.data;
};

// 일기 수정
export const updateDiary = async (
  id: number,
  content: string
): Promise<void> => {
  await apiClient.put(`/diary/${id}`, { content });
};
