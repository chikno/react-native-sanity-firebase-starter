// sanity.js

import { createClient } from '@sanity/client';
import { Env } from '@env';
export const sanityClient = createClient({
  projectId: Env.SANITY_PROJECT_ID,
  dataset: Env.SANITY_DATA_SET_NAME,
  useCdn: false,
  apiVersion: '2024-04-21',
  //token: `${Env.SECRET_KEY}`,
});
