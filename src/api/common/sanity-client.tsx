// sanity.js
import { createClient } from '@sanity/client';
export const sanityClient = createClient({
  projectId: '2rwj0fb6',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-04-21',
  //token: `${Env.SECRET_KEY}`,
});
