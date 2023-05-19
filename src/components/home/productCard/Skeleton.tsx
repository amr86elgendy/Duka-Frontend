export default function ProductCardSkeleton() {
  return (
    <div role="status" className="p-4 bg-white rounded-md ">
      <div className="h-full animate-pulse">
        <div className="flex flex-col h-full gap-5">
          <div className="image   bg-gray-200 w-full rounded h-[200px]" />
          <div className="flex flex-col gap-2">
            <div className="title   bg-gray-200 w-full rounded h-[10px]" />
            <div className="title  bg-gray-200 w-1/3 rounded h-[10px]" />
          </div>
          <div className="price   bg-gray-200 w-1/2 rounded h-[30px]" />
          <div className="button  bg-gray-200 w-full rounded h-[40px] mb-auto " />
        </div>
      </div>
    </div>
  );
}
