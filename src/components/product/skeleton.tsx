export default function SingleProductSkeleton() {
  return (
    <div role="status" className="rounded-md bg-white p-8 ">
      <div className="h-full animate-pulse">
        <div className="grid h-full grid-cols-2 gap-8 ">
          {/* --------- IMG ----------- */}
          <div className="flex h-full flex-col justify-between gap-4">
            <div className="w-full flex-grow rounded-md bg-gray-200" />
            <div className="flex h-[80px] gap-4">
              <div className=" w-[80px] rounded-md bg-gray-200" />
              <div className=" w-[80px] rounded-md bg-gray-200" />
            </div>
          </div>
          {/* --------- Details ----------- */}
          <div className="flex flex-col gap-4">
            <div className="mb-2 h-6 rounded-md bg-gray-200" />
            <div className="mb-4 h-6 w-1/5 rounded-md bg-gray-200" />
            <div className="mb-8 flex items-center gap-4">
              <div className="h-2 w-1/5 rounded-md bg-gray-200" />
              <div className="h-2 w-1/5 rounded-md bg-gray-200" />
              <div className="h-2 w-1/5 rounded-md bg-gray-200" />
            </div>
            <div className="mb-6 h-6 w-1/5 rounded-md bg-gray-200" />
            <div className="mb-6 flex flex-col gap-4">
              <div className="h-3 w-4/5 rounded-md bg-gray-200" />
              <div className="h-3 w-3/5 rounded-md bg-gray-200" />
              <div className="h-3 w-2/5 rounded-md bg-gray-200" />
            </div>
            <div className="mb-6 h-10 rounded-md bg-gray-200" />
            <div className="grid grid-cols-[1fr_2fr] gap-4">
              <p className="h-2 w-[100px] rounded-md bg-gray-200" />
              <p className="h-2 w-[100px] rounded-md bg-gray-200" />
              <p className="h-2 w-[100px] rounded-md bg-gray-200" />
              <p className="h-2 w-[100px] rounded-md bg-gray-200" />
              <p className="h-2 w-[100px] rounded-md bg-gray-200" />
              <p className="h-2 w-[100px] rounded-md bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
