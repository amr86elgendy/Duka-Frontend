import { useParams } from 'react-router-dom';
import SimilarProducts from '@/components/product/similarProducts';
import ProductDetail from '@/components/product/productDetails';
import { useGetSingleProduct } from '@/apis/shopping';
import Error from './Error';
import SingleProductSkeleton from '@/components/product/skeleton';
import ProductTabs from '@/components/product/productTabs';

export default function ProductPage() {
  const { productId } = useParams();
  console.log(productId);

  const { data: product, isLoading, isError } = useGetSingleProduct(productId!);

  if (isError) {
    return <Error />;
  }
  return (
    <div className="container min-h-scree">
      <div className="grid grid-cols-[5fr_2fr] w-full gap-4  mb-8">
        {/* ----------------- Product ----------------- */}
        {isLoading ? (
          <SingleProductSkeleton />
        ) : (
          <div className="p-8 bg-white rounded-md">
            <ProductDetail {...product} />
          </div>
        )}
        {/* ----------------- Similar Products ----------------- */}
        <div className="p-8 bg-white rounded-md">
          <SimilarProducts />
        </div>
      </div>
      {/* ----------------- Desc & Rviews ----------------- */}
      <div className="p-8 bg-white rounded-md">
        <ProductTabs
          description={product?.description}
          numReviews={product?.numReviews}
          averageRating={product?.averageRating}
        />
      </div>
    </div>
  );
}
