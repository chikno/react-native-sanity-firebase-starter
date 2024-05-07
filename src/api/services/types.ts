export type ServiceType = {
  prestation: any;
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  duration: string;
  isPopular: boolean;
  isHero: boolean;
  details: detailType;
  category: string;
  city: string[];
  isBooking: boolean;
};

export type detailType = {
  _type: string;
  myArray: [];
};

export type ServicesType = {
  services: ServiceType[];
};
export type CityType = {
  label: string;
  value: string;
};
export type Citiestype = CityType[];
