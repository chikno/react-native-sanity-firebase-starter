import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { sanityClient } from '../common/sanity-client';
import type { ServicesType } from './types';

type Response = ServicesType;
type Variables = string;

export const useSearch = createMutation<Response, Variables, AxiosError>({
  mutationFn: (variables: Variables): Promise<ServicesType> => {
    return sanityClient.fetch(`${variables}`).then((response) => response);
  },
});
