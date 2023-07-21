import { Link } from 'react-router-dom';
import { FiChevronsRight } from 'react-icons/fi';
import banner from '@/assets/banners.jpg';
import { useGetCategories } from '@/apis/public';

export default function CategoryList() {
  const { data: categories } = useGetCategories();
  return (
    <div className="flex flex-col border-r bg-white">
      <div className="basis-[393px] bg-green-500">
        <img className="h-full object-cover" src={banner} alt="" />
      </div>
      <div className="p-8">
        <ul className="mb-6 grid grid-cols-2 gap-y-2 border-b border-gray-200 pb-6">
          {categories?.map((category: Record<string, string>) => (
            <li
              key={category._id}
              className="transition-all hover:translate-x-2 hover:text-red-500"
            >
              <Link className="capitalize" to="/">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1 text-red-500">
          <Link to="/products">See All Products</Link>
          <FiChevronsRight />
        </div>
      </div>
    </div>
  );
}
