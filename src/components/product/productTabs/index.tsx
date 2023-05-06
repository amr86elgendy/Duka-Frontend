import useToggle from '@/hooks/useToggle';
import ProductReviews from './reviews';
import ProductDescription from './description';

type TProductTabs = {
  averageRating: number;
  description: string;
  numReviews: number;
};
export default function ProductTabs({
  averageRating,
  description,
  numReviews,
}: TProductTabs) {
  const tabs: [string, string] = ['description', 'reviews'];
  const [tabValue, toggleTab] = useToggle(tabs);
  return (
    <>
      <div className="flex mb-6 border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            className={
              tabValue === tab
                ? 'text-lg px-4 py-2 font-semibold border-b-2 border-red-500 '
                : 'cursor-pointer text-lg px-4 py-2 hover:text-gray-900 text-gray-500'
            }
            onClick={() => toggleTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {tabValue === 'reviews' ? (
        <ProductReviews numReviews={numReviews} averageRating={averageRating} />
      ) : (
        <ProductDescription description={description} />
      )}
    </>
  );
}
