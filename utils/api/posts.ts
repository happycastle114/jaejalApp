import apiClient from "./index";

// 게시글 타입
export interface Post {
  id: number;
  title: string;
  content: string | null;
  owner_id: number;
}

// 게시글 생성 요청 타입
export interface CreatePostRequest {
  title: string;
  content: string | null;
}

// 게시글 수정 요청 타입
export interface UpdatePostRequest {
  id: number;
  title: string;
  content: string;
}

// 게시글 조회
export const getPost = async (id: number): Promise<Post> => {
  const response = await apiClient.get<Post>("/post/", {
    params: { id },
  });
  return response.data;
};

// 게시글 생성
export const createPost = async (data: CreatePostRequest): Promise<Post> => {
  const response = await apiClient.post<Post>("/post/", data);
  return response.data;
};

// 게시글 수정
export const updatePost = async (data: UpdatePostRequest): Promise<void> => {
  await apiClient.patch("/post/", data);
};

// 게시글 삭제
export const deletePost = async (id: number): Promise<void> => {
  await apiClient.delete("/post/", {
    params: { id },
  });
};

// 게시글 목록 조회
export const listPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>("/post/list");
  return response.data;
};
