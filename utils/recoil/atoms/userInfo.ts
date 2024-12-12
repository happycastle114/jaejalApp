import { atom } from "recoil";
import { UserInfo } from "../../api/auth";

export const userInfoState = atom<UserInfo | null>({
  key: "userInfoState",
  default: null,
});
