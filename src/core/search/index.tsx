import { create } from 'zustand';

import type { ServicesType } from '@/api';

export const _useSearch = create((set) => ({
  search: (searchResult: ServicesType) =>
    set({ searchStore: searchResult, searchQuery: {} }),
}));
