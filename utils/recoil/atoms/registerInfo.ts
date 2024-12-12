import { atom } from "recoil";
import { UserInfo } from "../../api/auth";

type RegisterInfo = {
  username?: string;
  password?: string;
  fullname?: string;
  fontSize?: number;
  telephone?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  cron_expression?: string;
};

export const registerInfoState = atom<RegisterInfo | null>({
  key: "registerInfoState",
  default: null,
});
