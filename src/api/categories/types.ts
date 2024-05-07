export type categoryType = {
  _id: string;
  name: string;
  image: string;
  description: string;
};

export type CategoriesType = {
  services: categoryType[];
};
