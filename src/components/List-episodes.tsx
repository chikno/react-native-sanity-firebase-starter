import { FlashList } from '@shopify/flash-list';
import React from 'react';

import type { ServicesType, ServiceType } from '@/api';

import { Card } from './card';

type propTypes = {
  data: ServicesType;
  ListHeaderComponent?:
  | React.ComponentType<any>
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};
const ListEpisodes = ({ data, ListHeaderComponent }: propTypes) => {
  const renderItem = React.useCallback(({ item }: { item: ServiceType }) => {
    return <Card {...item} />;
  }, []);

  return (
    <FlashList
      ListHeaderComponent={ListHeaderComponent}
      data={data}
      renderItem={renderItem}
      numColumns={1}
      keyExtractor={(_, index) => `item-${index}`}
      estimatedItemSize={300}
    />
  );
};

export default ListEpisodes;
