import type { AxiosError } from 'axios';
import { addDoc, collection } from 'firebase/firestore';
import { createMutation } from 'react-query-kit';

import { db } from '../../api/firebase';
import type { ServiceType } from '../services';
import type { BookingType } from './types';
type Variables = {
  displayName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  prestation: string;
  service: ServiceType;
  date: Date;
};
type Response = BookingType;

export const useAddBooking = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables: Variables) => {
    const doc = await addDoc(collection(db, 'booking'), {
      displayName: variables?.displayName,
      phoneNumber: variables?.phoneNumber,
      email: variables?.email,
      address: variables?.address,
      city: variables?.city,
      prestation: variables?.prestation,
      date: variables?.date,
      service: variables.service,
    });
    return doc;
  },
});
