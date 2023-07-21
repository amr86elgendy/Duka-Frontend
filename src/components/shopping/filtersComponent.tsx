import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetBrands, useGetCategories } from '@/apis/public';
import FilterMenu from './filterMenu';
import FilterSkeleton from './filterSkeleton';

export default React.memo(function Filters() {
  const { t } = useTranslation('products');
  const { data: categories, isLoading: loadCategories } = useGetCategories();
  const { data: brands, isLoading: loadBrands } = useGetBrands();

  if (loadCategories || loadBrands) return <FilterSkeleton />;
  return (
    <div className="flex gap-2">
      <FilterMenu
        label={t('sort')}
        name="sort"
        multiple={false}
        options={[
          { _id: '-averageRating', name: 'customer rating' },
          { _id: 'name', name: 'name' },
          { _id: '-createdAt', name: 'newest' },
          { _id: '-price', name: 'price high to low' },
          { _id: 'price', name: 'price low to high' },
          { _id: '-sold', name: 'top seller' },
        ]}
      />
      <FilterMenu
        label={t('category')}
        name="category"
        multiple
        options={categories}
      />
      <FilterMenu label={t('brand')} name="brand" multiple options={brands} />
    </div>
  );
});
