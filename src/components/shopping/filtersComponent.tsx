import React from 'react';
import { useGetBrands, useGetCategories } from '@/apis/public';
import FilterMenu from './filterMenu';

export default React.memo(function Filters() {
  const { data: categories, isLoading: loadCategories } = useGetCategories();
  const { data: brands, isLoading: loadBrands } = useGetBrands();

  if (loadCategories || loadBrands) return <div>Loading ...</div>;
  return (
    <div className="flex gap-2">
      <FilterMenu
        name="sort"
        multiple={false}
        options={[
          { _id: '-averageRating', name: 'customer rating' },
          { _id: 'name', name: 'name' },
          { _id: '-createdAt', name: 'newest' },
          { _id: '-price', name: 'price-high to low' },
          { _id: 'price', name: 'price-low to high' },
          { _id: '-sold', name: 'top-seller' },
        ]}
      />
      <FilterMenu name="category" multiple options={categories} />
      <FilterMenu name="brand" multiple options={brands} />
    </div>
  );
});
