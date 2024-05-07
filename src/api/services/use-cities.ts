import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { sanityClient } from '../common/sanity-client';
import type { Citiestype } from './types';

type Response = Citiestype;
type Variables = string;

export const useCities = createQuery<Response, Variables, AxiosError>({
  queryKey: ['cities'],
  fetcher: (query: Variables): Promise<Citiestype> => {
    return sanityClient.fetch(`${query}`).then((response) => response);
  },
});
