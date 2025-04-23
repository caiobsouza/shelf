import { create } from "zustand";
import { User } from "@/shared/interfaces/user.interface";
import { FirebaseError } from "firebase/app";
import { mapFirebaseAuthError } from "@/shared/utils/firebase-errors";

export interface AuthStore {
  user: User | null;
  authError: Error | FirebaseError | null;
  setUser: (user: User) => void
  setAuthError: (error: Error | FirebaseError | null) => void
  getAuthError: () => string | null
  clearUser: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  authError: null,
  setUser(user) {
    set(() => ({ user }));
  },
  clearUser() {
    set(() => ({ user: null }));
  },
  isAuthenticated() {
    return !!get().user?.uid;
  },
  setAuthError(error) {
    set(() => ({ authError: error }));
  },
  getAuthError() {
    const error = get().authError;
    if (!error) return null;

    if (error instanceof FirebaseError) {
      return mapFirebaseAuthError(error.code);
    } else {
      return error?.message || "Sign in error";
    }
  },
}));
