import { Link } from 'react-router-dom';
import { FiChevronsRight } from 'react-icons/fi';
import banner from '@/assets/banners.jpg';
import { useGetCategories } from '@/apis/public';

export default function CategoryList() {
  const { data: categories } = useGetCategories();
  return (
    <div className="flex flex-col bg-white border-r">
      <div className="bg-green-500 basis-[393px]">
        <img className="object-cover h-full" src={banner} alt="" />
      </div>
      <div className="p-8">
        <ul className="grid grid-cols-2 pb-6 mb-6 border-b border-gray-200 gap-y-2">
          {categories?.map((category: Record<string, string>) => (
            <li
              key={category._id}
              className="transition-all hover:text-red-500 hover:translate-x-2"
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
