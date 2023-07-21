import { useMemo } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import ShoppingItem from '../components/shopping/shoppingItem';
import { useGetProducts } from '../apis/shopping';
import FiltersComponent from '../components/shopping/filtersComponent';
import SelectedFiltersComponent from '@/components/shopping/selectedFilters';
import ProductSkeleton from '@/components/home/productCard/Skeleton';
import Error from './Error';
import { TFilterState, useFilterContext } from '@/context/filter';

export default function ShoppingPage() {
  const { t } = useTranslation('products');
  const { filters } = useFilterContext();

  const selectedFilters = useMemo(() => {
    const arr: { label: string; name: keyof TFilterState; value: string }[] =
      [];
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((v) =>
            // arr.push([t(key as keyof TFilterState), v.split(',')[1]])
            arr.push({
              label: t(key),
              name: key as keyof TFilterState,
              value: v.split(',')[1],
            })
          );
        } else
          arr.push({
            label: t(key),
            name: key as keyof TFilterState,
            value: value.split(',')[1],
          });
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
      <div className="rounded-md bg-white px-4 py-6">
        <h1 className="mb-12 text-3xl font-semibold">{t('all-products')}</h1>
        <div className="flex flex-col gap-4 border-b border-gray-300 pb-4">
          <div className="flex items-center justify-between">
            <FiltersComponent />
            {data && (
              <p className="text-gray-400 ">{data.pages[0].totalCount} Items</p>
            )}
          </div>
          <SelectedFiltersComponent filters={selectedFilters} />
        </div>

        <div className="mb-8 grid grid-cols-4">
          {isLoading ? (
            [...Array(12).keys()].map((el) => <ProductSkeleton key={el} />)
          ) : products.length === 0 ? (
            <h1>no items matches your filter</h1>
          ) : (
            products.map((p) => <ShoppingItem key={p._id} {...p} />)
          )}
        </div>
        {hasNextPage && (
          <div className="flex w-full justify-center ">
            <button
              type="button"
              onClick={() => fetchNextPage()}
              className="flex h-10 w-32 items-center justify-center rounded-md bg-gray-600 px-4 py-2 capitalize text-white"
            >
              {isFetchingNextPage ? (
                <FaSpinner className=" animate-spin" size={22} />
              ) : (
                t('load-more')
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
