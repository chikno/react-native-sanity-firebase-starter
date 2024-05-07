import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { sanityClient } from '../common/sanity-client';
import type { ServicesType } from './types';

type Response = ServicesType;
type Variables = string;

export const useFilter = createMutation<Response, Variables, AxiosError>({
  mutationFn: (variables: Variables) => {
    return sanityClient.fetch(`${variables}`).then((response) => response);
  },
});
