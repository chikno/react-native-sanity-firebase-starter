import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCities } from '@/api/services/use-cities';
import { useFilter } from '@/api/services/use-filter';
import {
  ActivityIndicator,
  Button,
  ControlledInput,
  ControlledSelect,
  Radio,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';
import { Search } from '@/ui/icons';

const schema = z.object({
  service: z.string({
    required_error: 'Service is required',
  }),
  city: z.string({
    required_error: 'city is required',
  }),
});

export type FormType = z.infer<typeof schema>;

export type SearchFormProps = {
  onSubmit: () => SubmitHandler<FormType>;
  onSelect: () => void;
  domicileSelected: boolean;
  cabinetSelected: boolean;
  domicileDisabled: boolean;
  onChangeDomicile: () => void;
  onChangeCabinet: () => void;
  onFilter: () => void;
  isLoading: boolean;
};
export const SearchForm = ({
  onSelect,
  onChangeDomicile,
  onChangeCabinet,
  onSubmit,
  domicileSelected,
  cabinetSelected,
  domicileDisabled,
  isLoading,
}: SearchFormProps) => {
  const [serviceNames, setServiceNames] = React.useState([]);

  const { handleSubmit, control, setValue, getValues } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const variables = '*[_type == "cities"]{value, label, _id}';
  const { data } = useCities({ variables });

  let city = getValues('city');
  let filterTerm = getValues('service');

  const query = `*[_type == 'services' && name match "${filterTerm}*"]{name}`;
  //const query = `*[_type == 'services' && '${filterTerm}' in name]{name}`;
  const { mutate: onFilter, isLoading: isFiltering } = useFilter();
  const onFilterForm = () => {
    onFilter(query, {
      onSuccess: (response) => {
        setServiceNames(response);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <View className="mt-4 w-full px-4">
      <View className="relative">
        <View className="absolute left-2 top-3 z-30">
          {isFiltering ? <ActivityIndicator /> : <Search color={'black'} />}
        </View>

        <ControlledInput
          disabled={true}
          onKeyPress={onFilterForm}
          name="service"
          control={control}
          placeholder="Rechercher un service"
          className="mb-2 rounded-xl bg-neutral-200 p-4 pl-10 text-black placeholder:text-black"
        />
      </View>

      <ControlledSelect
        onSelect={onSelect}
        placeholder="Ville"
        options={data}
        name="city"
        control={control}
      />
      {serviceNames && serviceNames.length > 0 && (
        <View className="absolute left-2 top-16 z-40 w-full rounded-md bg-white px-4 py-2 shadow-md">
          {serviceNames &&
            serviceNames.map((service, index) => {
              return (
                <TouchableOpacity
                  className="my-2"
                  key={index}
                  onPress={() => {
                    setValue('service', service.name, { shouldDirty: true });
                    setServiceNames([]);
                  }}
                >
                  <Text>{service?.name}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      )}
      <View className="mb-4 flex-row gap-6">
        <Radio
          accessibilityLabel="A domicile"
          disabled={domicileDisabled}
          label="A domicile"
          onChange={onChangeDomicile}
          checked={domicileSelected}
        />
        <Radio
          accessibilityLabel="Au cabinet"
          label="Au cabinet"
          onChange={onChangeCabinet}
          checked={cabinetSelected}
        />
      </View>

      <Button
        loading={isLoading}
        label="RECHERCHER"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
