import { NavLink } from 'react-router-dom';
import ProductCard from '@/components/productCard';
import CategoryList from './CategoryList';
import CategoryProduct from './FeaturedProduct';
import { useGetProducts } from '@/apis/shopping';
import Skeleton from '@/components/productCard/Skeleton';

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
      <div className="flex items-center justify-between mb-4">
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
      <div className="grid grid-cols-[1fr_max-content_1fr] rounded-md overflow-hidden">
        <CategoryList />
        <div className="grid grid-cols-3 bg-gray-200 gap-[1px] border-r">
          {isLoading
            ? [...Array(3).keys()].map((el) => <Skeleton key={el} />)
            : restProducts.map((p) => (
                <ProductCard
                  key={p._id}
                  title={p.name}
                  src={p.images[0]}
                  price={p.price}
                  _id={p._id}
                />
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
