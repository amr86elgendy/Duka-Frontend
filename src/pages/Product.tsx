import { useParams } from 'react-router-dom';
import SimilarProducts from '@/components/product/similarProducts';
import ProductDetail from '@/components/product/details';
import { useGetSingleProduct } from '@/apis/shopping';
import SingleProductSkeleton from '@/components/product/skeleton';
import ProductTabs from '@/components/product/productTabs';
import Error from './Error';

export default function ProductPage() {
  const { productId } = useParams();

  const { data: product, isLoading, isError } = useGetSingleProduct(productId!);

  if (isError) {
    return <Error />;
  }

  return (
    <section className="container">
      <div className="mb-8 grid w-full grid-cols-[5fr_2fr]  gap-4">
        {/* ----------------- Product ----------------- */}
        {isLoading ? (
          <SingleProductSkeleton />
        ) : (
          <div className="rounded-md bg-white p-8">
            <ProductDetail {...product} />
          </div>
        )}
        {/* ----------------- Similar Products ----------------- */}
        <div className="rounded-md bg-white p-8">
          <SimilarProducts />
        </div>
      </div>
      {/* ----------------- Desc & Rviews ----------------- */}
      <div className="rounded-md bg-white p-8">
        {product && (
          <ProductTabs
            description={product.description}
            numReviews={product.numReviews}
            averageRating={product.averageRating}
          />
        )}
      </div>
    </section>
  );
}
