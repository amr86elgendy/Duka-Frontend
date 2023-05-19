import { useMemo } from 'react';
import { FaSpinner } from 'react-icons/fa';
import ShoppingItem from '../components/shopping/shoppingItem';
import { useGetProducts } from '../apis/shopping';
import FiltersComponent from '../components/shopping/filtersComponent';
import SelectedFiltersComponent from '@/components/shopping/selectedFilters';
import ProductSkeleton from '@/components/home/productCard/Skeleton';
import Error from './Error';
import { TFilterState, useFilterContext } from '@/context/filter';

export default function ShoppingPage() {
  const { filters } = useFilterContext();

  const selectedFilters = useMemo(() => {
    // console.log('useMemo selectedFilters');
    const arr: [keyof TFilterState, string][] = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((v) =>
            arr.push([key as keyof TFilterState, v.split(',')[1]])
          );
        } else arr.push([key as keyof TFilterState, value.split(',')[1]]);
      }
    });
    return arr;
  }, [filters]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useGetProducts({ filters, queries: { limit: 12 } });
  const products = data?.pages.flatMap((page) => page.products) || [];

  if (error) return <Error />;
  return (
    <section className="container">
      <div className="px-4 py-6 bg-white rounded-md">
        <h1 className="mb-12 text-3xl font-semibold">All Products</h1>
        <div className="pb-4 border-b border-gray-300 ">
          <div className="flex items-center justify-between mb-2">
            <FiltersComponent />
            {data && (
              <p className="text-gray-400 ">{data.pages[0].totalCount} Items</p>
            )}
          </div>
          <SelectedFiltersComponent filters={selectedFilters} />
        </div>

        <div className="grid grid-cols-4 mb-8">
          {isLoading ? (
            [...Array(12).keys()].map((el) => <ProductSkeleton key={el} />)
          ) : products.length === 0 ? (
            <h1>no items matches your filter</h1>
          ) : (
            products.map((p) => <ShoppingItem key={p._id} {...p} />)
          )}
        </div>
        {hasNextPage && (
          <div className="flex justify-center w-full ">
            <button
              type="button"
              onClick={() => fetchNextPage()}
              className="flex items-center justify-center h-10 px-4 py-2 text-white bg-gray-600 rounded-md w-28"
            >
              {isFetchingNextPage ? (
                <FaSpinner className=" animate-spin" />
              ) : (
                'Load More'
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
