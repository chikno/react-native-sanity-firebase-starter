import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { sanityClient } from '../common/sanity-client';
import type { ServicesType, ServiceType } from './types';

type Response = ServiceType;
type Variables = string;

export const useService = createQuery<Response, Variables, AxiosError>({
  queryKey: ['service'],
  fetcher: (variables: Variables): Promise<ServicesType> => {
    return sanityClient.fetch(`${variables}`).then((response) => response);
  },
});
