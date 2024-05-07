import type { AxiosError } from 'axios';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { createMutation } from 'react-query-kit';

import { auth as firebaseAuth, db } from '../../api/firebase';
import type { AuthStatus } from './types';
type Variables = { email: string; password: string };
type Response = AuthStatus;

export const useLogin = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables: Variables) => {
    return signInWithEmailAndPassword(
      firebaseAuth,
      variables.email,
      variables.password
    ).then(async (response) => {
      const querySnapshot = await getDocs(
        query(collection(db, 'users'), where('uid', '==', response.user.uid))
      );
      let userData;
      querySnapshot.forEach((doc) => {
        userData = doc.data();
        userData.idToken = response._tokenResponse.idToken;
        userData._tokenResponse = response._tokenResponse.refreshToken;
      });

      return userData;
    });
  },
});
