import { LoginSchema } from "@/components/LoginForm/schema";
import { firebaseAuth } from "@/core/firebase";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export enum AUTH_MUTATION_KEYS {
  sign_in = "sign_in",
  sign_out = "sign_out"
}

export const useSignIn = () => useMutation({
  mutationKey: [AUTH_MUTATION_KEYS.sign_in],
  mutationFn: async (credentials: LoginSchema) => {
    const { email, password } = credentials;
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }
});

export const useSignOut = (options?: UseMutationOptions) => useMutation({
  mutationKey: [AUTH_MUTATION_KEYS.sign_out],
  mutationFn: async () => {
    return signOut(firebaseAuth);
  },
  ...options
});

