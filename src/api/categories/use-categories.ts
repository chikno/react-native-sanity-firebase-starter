import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { sanityClient } from '../common/sanity-client';
import type { CategoriesType } from './types';

type Response = CategoriesType;
type Variables = string;

export const useCategories = createQuery<Response, Variables, AxiosError>({
  queryKey: ['categories'],
  fetcher: (variables: Variables): Promise<CategoriesType> => {
    return sanityClient.fetch(`${variables}`).then((response) => response);
  },
});
