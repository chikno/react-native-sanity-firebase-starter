import * as React from 'react';

import { CategoriesList } from '@/components/categories-list';
import { FocusAwareStatusBar, View } from '@/ui';

export default function Categories() {
  return (
    <View className="h-full bg-primary-100">
      <FocusAwareStatusBar />
      <CategoriesList isCarousel={false} />
    </View>
  );
}
