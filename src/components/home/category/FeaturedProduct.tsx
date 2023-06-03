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
    <div className="bg-white p-6 ">
      <div className=" m-auto max-w-[60%] bg-red-500 ">
        <img
          className="h-full w-full cursor-pointer transition-all duration-200 hover:scale-110"
          src={images[0]}
          alt=""
        />
      </div>
      <div className="my-6 flex flex-col gap-2 border-b py-6">
        <h1 className="font-semibold capitalize text-blue-700">{name}</h1>
        <div className="flex items-center gap-2">
          <FormatNumber value={price} />
        </div>
      </div>
      <div>{description}</div>
    </div>
  );
}
