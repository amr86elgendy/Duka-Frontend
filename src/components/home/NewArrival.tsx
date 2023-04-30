import ProductCard from '@/components/productCard';
import { useGetProducts } from '@/apis/shopping';
import Skeleton from '@/components/productCard/Skeleton';

export default function NewArrival() {
  const queries = {
    sort: '-createdAt',
    limit: 5,
  };
  const { data, isLoading, error } = useGetProducts({ queries });

  return (
    <div className="mb-12 border-4 bg-red-500 overflow-hidden border-red-500 rounded-md text-white grid grid-cols-[1fr_minmax(1130px,_2fr)]">
      <div className="p-10 ">
        <h1 className="text-2xl font-semibold">
          Week Deals <br />
          Limited, Just Now!
        </h1>
        <h2 className="mb-6 text-9xl">50%</h2>
        <button
          type="button"
          className="px-8 py-4 font-semibold text-red-500 bg-white rounded-md "
        >
          See More
        </button>
      </div>
      <div className="grid grid-cols-5 overflow-hidden bg-gray-200 rounded-lg">
        {isLoading
          ? [...Array(5).keys()].map((el) => <Skeleton key={el} />)
          : data?.pages
              .flatMap((page) => page.products)
              .map((p) => (
                <ProductCard
                  key={p._id}
                  title={p.name}
                  src={p.images[0]}
                  price={p.price}
                  _id={p._id}
                />
              ))}
      </div>
    </div>
  );
}
