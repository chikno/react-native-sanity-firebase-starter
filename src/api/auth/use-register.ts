import type { AxiosError } from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createMutation } from 'react-query-kit';

import { auth } from '../../api/firebase';
import type { AuthStatus } from './types';

type Variables = { email: string; password: string };
type Response = AuthStatus;

export const useRegister = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables: Variables) => {
    return createUserWithEmailAndPassword(
      auth,
      variables.email,
      variables.password
    ).then((response) => response);
  },
});
