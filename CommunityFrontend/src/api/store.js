import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isLogIn: false,
      email: "",
      userId: "",
      nickname: "",
      isSocketConnected: false,

      setSocketConnected: (connected) =>
      set((state) => ({ isSocketConnected: connected })),

      login: (email, userId, nickname) =>
        set({
          isLogIn: true,
          email: email,
          userId: userId,
          nickname:nickname,
        }),
      logout: () =>
        set({
          isLogIn: false,
          email: "",
          userId: "",
          nickname:"",
        }),
    }),
    {
      name: "auth-store",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
