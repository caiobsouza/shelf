import { useAuthStore } from '@/stores/Auth.store';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { useEffect } from 'react';
import { firebaseAuth } from '@/core/firebase';

export const useAuthListener = () =>
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser: FirebaseUser | null) => {
      const { setUser, clearUser } = useAuthStore.getState();

      if (firebaseUser) {
        const user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        };
        setUser(user);
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, []);
