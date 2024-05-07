import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { sanityClient } from '../common/sanity-client';
import type { ServicesType } from './types';

type Response = ServicesType;
type Variables = string;

export const useServices = createQuery<Response, Variables, AxiosError>({
  queryKey: ['services'],
  fetcher: (variables: Variables): Promise<ServicesType> => {
    return sanityClient.fetch(`${variables}`).then((response) => response);
  },
});
