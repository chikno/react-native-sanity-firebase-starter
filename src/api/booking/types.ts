import type { ServiceType } from '../services';

export type BookingType = {
  displayName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  prestation: string;
  service: ServiceType;
  date: Date;
};

export type BookingTypes = BookingType[];
