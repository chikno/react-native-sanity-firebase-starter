import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { z } from 'zod';

import { formatDate, type ServiceType, useCities } from '@/api';
import { _useSelectedService } from '@/core/booking';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import {
  Button,
  ControlledInput,
  ControlledSelect,
  Radio,
  TouchableOpacity,
  View,
} from '@/ui';
import { Calendar } from '@/ui/icons';

type Props = {
  data: ServiceType;
  onSubmit: () => SubmitHandler<FormType>;
  onSelect: (value: string | number) => void;
  domicileSelected: boolean;
  cabinetSelected: boolean;
  domicileDisabled: boolean;
  onChangeDomicile: () => void;
  onChangeCabinet: () => void;
  onFilter: () => void;
  isLoading: boolean;
  user: object;
};

const schema = z.object({
  date: z.string({
    required_error: 'name is required',
  }),
  city: z.string({
    required_error: 'city is required',
  }),
  displayName: z.string({
    required_error: 'city is required',
  }),
  email: z.string({
    required_error: 'city is required',
  }),
  phoneNumber: z.string({
    required_error: 'city is required',
  }),
  address: z.string({
    required_error: 'city is required',
  }),
});

export type FormType = z.infer<typeof schema>;

export const BookingForm = ({
  onSubmit,
  isLoading,
  domicileDisabled,
  onChangeDomicile,
  onSelect,
  domicileSelected,
  onChangeCabinet,
  cabinetSelected,
  user,
}: Props) => {
  useSoftKeyboardEffect();
  const { handleSubmit, control, getValues, setValue } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const selectedService = _useSelectedService.getState().selectedService;
  React.useEffect(() => {
    setValue('displayName', user.displayName);
    setValue('email', user.email);
    setValue('phoneNumber', user.phoneNumber);
    setValue('address', user.address);
    setValue('city', selectedService.city[0]);
    setValue('date', new Date());
  }, []);

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    hideDatePicker();

    setValue('date', formatDate(date));
  };

  const variables = '*[_type == "cities"]{value, label, _id}';
  const { data: cities } = useCities({ variables });
  return (
    <View className="  w-full flex-1 p-4">
      <View className="px- grid grid-cols-2 gap-4">
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          locale="fr"
          minimumDate={new Date()}
        />

        <View className="relative">
          <ControlledInput
            placeholder="Choisissez la date et l'heure"
            control={control}
            name="date"
            onFocus={showDatePicker}
            showSoftInputOnFocus={false}
          />
          <TouchableOpacity
            className="absolute right-2 top-2"
            onPress={showDatePicker}
          >
            <Calendar color={'black'} />
          </TouchableOpacity>
        </View>
        <ControlledSelect
          onSelect={onSelect}
          placeholder="Ville"
          options={cities}
          name="city"
          control={control}
        />
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

        <ControlledInput
          placeholder="Nom complet"
          control={control}
          name="displayName"
          readOnly
        />
        <ControlledInput
          placeholder="Email"
          control={control}
          name="email"
          readOnly
        />
        <ControlledInput
          placeholder="Téléphone"
          control={control}
          name="phoneNumber"
          showSoftInputOnFocus={true}
        />

        <ControlledInput
          placeholder="Addresse"
          control={control}
          name="address"
          showSoftInputOnFocus={true}
        />
        <Button
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
          label="Je resérve ma séance"
          className="mb-24"
        />
      </View>
    </View>
  );
};
