import { NavLink } from 'react-router-dom';
import ProductCard from '@/components/home/productCard';
import CategoryList from './CategoryList';
import CategoryProduct from './FeaturedProduct';
import { useGetProducts } from '@/apis/shopping';
import Skeleton from '@/components/home/productCard/Skeleton';

export default function Category() {
  const queries = {
    category: '63d308fe047db9803271f954',
    limit: 7,
    sort: '-sold',
  };
  const { data, isLoading, error } = useGetProducts({ queries });
  const topSellerProduct =
    data?.pages
      .flatMap((page: Record<string, any>) => page.products)
      .slice(0, 1)[0] ?? [];

  const restProducts =
    data?.pages
      .flatMap((page: Record<string, any>) => page.products)
      .slice(1) ?? [];

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Digital & Electronic
        </h1>
        <ul className="flex gap-10">
          <li className="hover:text-red-500">
            <NavLink to="/">Best Seller </NavLink>
          </li>
          <li className="hover:text-red-500">
            <NavLink to="/">Top Rate </NavLink>
          </li>
          <li className="hover:text-red-500">
            <NavLink to="/">Special Products </NavLink>
          </li>
          <li className="hover:text-red-500">
            <NavLink to="/">Featured Product </NavLink>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-[1fr_50%_1fr] overflow-hidden rounded-md">
        <CategoryList />
        <div className="grid grid-cols-3 gap-[1px] border-r bg-gray-200">
          {isLoading
            ? [...Array(3).keys()].map((el) => <Skeleton key={el} />)
            : restProducts.map((p) => (
                <ProductCard key={p._id} src={p.images[0]} {...p} />
              ))}
        </div>

        {isLoading ? (
          <span>loading</span>
        ) : (
          <CategoryProduct {...topSellerProduct} />
        )}
      </div>
    </>
  );
}
