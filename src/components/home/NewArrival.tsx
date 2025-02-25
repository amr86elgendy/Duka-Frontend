import ProductCard from './productCard';
import Skeleton from '@/components/home/productCard/Skeleton';

export default function NewArrival() {
  return (
    <div className="mb-12 grid grid-cols-[25%,1fr] overflow-hidden rounded-md border-4 border-red-500 bg-red-500 text-white">
      <div className="p-10 ">
        <h1 className="text-2xl font-semibold">
          Week Deals <br />
          Limited, Just Now!
        </h1>
        <h2 className="mb-6 text-9xl">50%</h2>
        <button
          type="button"
          className="rounded-md bg-white px-8 py-4 font-semibold text-red-500 "
        >
          See More
        </button>
      </div>
    </div>
  );
}
