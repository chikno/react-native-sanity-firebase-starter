import type { AxiosError } from 'axios';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { createQuery } from 'react-query-kit';

import { db } from '../firebase';
import type { BookingType, BookingTypes } from './types';

type Response = BookingType;
type Variables = { email: string };

export const useGetUserBookings = createQuery<Response, Variables, AxiosError>({
  queryKey: ['bookings'],
  fetcher: async (variables: Variables): Promise<BookingTypes> => {
    const querySnapshot = await getDocs(
      query(collection(db, 'booking'), where('email', '==', variables.email))
    );

    let userBookings: BookingTypes = [];
    querySnapshot.forEach((doc) => {
      userBookings.push(doc.data());
    });

    return userBookings;
  },
});
