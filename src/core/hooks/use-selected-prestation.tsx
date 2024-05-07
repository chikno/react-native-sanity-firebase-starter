import React from 'react';
import { useMMKVString } from 'react-native-mmkv';

import { storage } from '../storage';
export type PrestationSchema = 'cabinet' | 'domicile';

const SELECTED_PRESTATION = 'SELECTED_PRESTATION';
export const useSelectedPrestation = () => {
  const [prestation, _setPrestation] = useMMKVString(
    SELECTED_PRESTATION,
    storage
  );
  const setSelectedPrestation = React.useCallback(
    (t: PrestationSchema) => {
      _setPrestation(t);
    },
    [_setPrestation]
  );
  const selectedPrestation = (prestation ?? 'domicile') as PrestationSchema;
  return { selectedPrestation, setSelectedPrestation } as const;
};

// to be used in the root file to load the selected theme from MMKV
export const loadSelectedPrestation = () => {
  const prestation = storage.getString(SELECTED_PRESTATION);
};
