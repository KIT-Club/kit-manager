import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import Cookies from "universal-cookie";

const key = "jwt_token";
const cookies = new Cookies();

const useUserStore = create(
  subscribeWithSelector((set) => ({
    token: cookies.get(key),
    setToken: (newValue: any) => set({ token: newValue }),
  }))
);

const unSub = useUserStore.subscribe(
  (state: any) => state.token,
  (newValue: any, old: any) => {
    cookies.set(key, newValue, {
      path: "/",
      sameSite: true,
      secure: true,
    });
  }
);

export default useUserStore;
