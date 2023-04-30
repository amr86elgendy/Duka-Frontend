import FormatNumber from '@/utils/format-number';

type FeaturedProductProp = {
  images: string[];
  name: string;
  price: number;
  description: string;
};

export default function FeaturedProduct({
  images,
  name,
  price,
  description,
}: FeaturedProductProp) {
  return (
    <div className="p-6 bg-white ">
      <div className=" max-w-[60%] m-auto bg-red-500 ">
        <img
          className="w-full h-full transition-all duration-200 cursor-pointer hover:scale-110"
          src={images[0]}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-2 py-6 my-6 border-b">
        <h1 className="font-semibold text-blue-700 capitalize">{name}</h1>
        <div className="flex items-center gap-2">
          <FormatNumber value={price} />
        </div>
      </div>
      <div>{description}</div>
    </div>
  );
}
