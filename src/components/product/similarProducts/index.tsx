import { Link, useParams } from 'react-router-dom';
import { TbChevronsRight } from 'react-icons/tb';
import ListItem from './listItem';
import { useGetSimilarProducts } from '@/apis/shopping';

export default function SimilarProducts() {
  const { productId } = useParams();
  const { data: similarProducts, isLoading } = useGetSimilarProducts({
    productId: productId!,
    limit: 3,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 ">
          Similar Products
        </h3>
        <div className="flex items-center gap-1 text-sm font-semibold text-red-500">
          <Link to="/products">See all products</Link>
          <TbChevronsRight />
        </div>
      </div>
      <div className="grid grid-rows-[repeat(3,minmax(150px,33%))] gap-4">
        {isLoading
          ? 'loading'
          : similarProducts?.map((product) => (
              <ListItem key={product._id} {...product} />
            ))}
      </div>
    </div>
  );
}
