import { atom } from "recoil";
import { User } from "firebase/auth";

export const userState = atom<User | null>({
   key: "userState",
   default: null,
})

export const authLoadingState = atom<boolean>({
   key: "authLoadingState",
   default: true,
})