import { create } from 'zustand';

import type { ServiceType } from '@/api';

export const _useSelectedService = create((set) => ({
  setService: (selectedService: ServiceType) =>
    set({ selectedService: selectedService }),
}));
