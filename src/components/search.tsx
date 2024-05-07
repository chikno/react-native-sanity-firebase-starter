import { usePathname, useRouter } from 'expo-router';
import * as React from 'react';

import { useSearch } from '@/api/services/use-search';
import { _useSearch } from '@/core/search';
import { Image, showErrorMessage, Text, View } from '@/ui';

import type { SearchFormProps } from './search-form';
import { SearchForm } from './search-form';
export const Search = () => {
  const { mutate: goSearch, isLoading } = useSearch();
  const router = useRouter();
  const pathName = usePathname();

  const search = _useSearch((state) => state.search);

  const onSubmit: SearchFormProps['onSubmit'] = (data) => {
    let prestation = domicileSelected ? 'domicile' : 'cabinet';
    let city = data?.city;
    let service = data?.service;
    data.prestation = domicileSelected ? 'domicile' : 'cabinet';
    const Searchvariables = `*[_type == 'services' && '${city}' in city[]->value && '${prestation}' in prestation[] && name match "${service}"]{_id, name , "category": category->name , "image":image.asset->url, isHero, price , duration , "city":city[]->value , prestation}`;
    goSearch(Searchvariables, {
      onSuccess: (response) => {
        search({
          searchResult: response,
          searchQuery: data,
        });
        pathName === '/' && router.push('/feed/search');
      },
      onError: (err) => {
        console.log(err);
        showErrorMessage('Search Error, please try again');
      },
    });
  };

  const CitiesWithDomicile = ['casablanca', 'rabat'];
  const [domicileSelected, setDomicileSelected] = React.useState(true);
  const [cabinetSelected, setCabinetSelected] = React.useState(false);
  const [domicileDisabled, setDomicileDisabled] = React.useState(false);

  const onSelect = (value: string | number) => {
    if (!CitiesWithDomicile.includes(value)) {
      setDomicileDisabled(true);
      setCabinetSelected(true);
      setDomicileSelected(false);
    } else {
      setDomicileDisabled(false);
    }
  };

  const onChangeDomicile = () => {
    setDomicileSelected(!domicileSelected);
    setCabinetSelected(false);
  };

  const onChangeCabinet = () => {
    setCabinetSelected(!cabinetSelected);
    setDomicileSelected(false);
  };

  return (
    <View className=" mb-10 mt-20 flex-1 items-center justify-center px-5">
      <View className="w-full items-center  justify-center rounded-xl border-[1px] border-neutral-300 bg-white  py-8 shadow-md ">
        <Image
          className="absolute -top-20 right-0 z-20 h-52 w-36"
          source={{
            uri: 'https://img1.wsimg.com/isteam/ip/821b7bf6-6f17-4763-ba3b-e8b0fd5daab1/blob-0005.png',
          }}
        />
        <Text className="text-lg font-bold text-primary-900 ">
          How can i help ?
        </Text>
        <SearchForm
          isLoading={isLoading}
          onChangeDomicile={onChangeDomicile}
          onChangeCabinet={onChangeCabinet}
          onSelect={onSelect}
          domicileSelected={domicileSelected}
          cabinetSelected={cabinetSelected}
          domicileDisabled={domicileDisabled}
          onSubmit={onSubmit}
        />
      </View>
    </View>
  );
};
