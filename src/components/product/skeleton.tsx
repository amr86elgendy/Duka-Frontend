export default function SingleProductSkeleton() {
  return (
    <div role="status" className="p-8 bg-white rounded-md ">
      <div className="h-full animate-pulse">
        <div className="grid h-full grid-cols-2 gap-8 ">
          {/* --------- IMG ----------- */}
          <div className="flex flex-col justify-between h-full gap-4">
            <div className="flex-grow w-full bg-gray-200 rounded-md" />
            <div className="flex h-[80px] gap-4">
              <div className=" rounded-md w-[80px] bg-gray-200" />
              <div className=" rounded-md w-[80px] bg-gray-200" />
            </div>
          </div>
          {/* --------- Details ----------- */}
          <div className="flex flex-col">
            <div className="w-[500px] h-6 rounded-md bg-gray-200 mb-2" />
            <div className="w-[100px] h-6 rounded-md bg-gray-200 mb-4" />
            <div className="flex items-center gap-4 mb-8">
              <div className="w-[100px] h-2 rounded-md bg-gray-200" />
              <div className="w-[100px] h-2 rounded-md bg-gray-200" />
              <div className="w-[100px] h-2 rounded-md bg-gray-200" />
            </div>
            <div className="w-[100px] h-6 rounded-md bg-gray-200 mb-6" />
            <div className="flex flex-col gap-4 mb-6">
              <div className="w-[400px] h-3 rounded-md bg-gray-200" />
              <div className="w-[300px] h-3 rounded-md bg-gray-200" />
              <div className="w-[200px] h-3 rounded-md bg-gray-200" />
            </div>
            <div className="w-[500px] h-10 rounded-md bg-gray-200 mb-6" />
            <div className="grid grid-cols-[1fr_2fr] gap-4">
              <p className="w-[100px] h-2 rounded-md bg-gray-200" />
              <p className="w-[100px] h-2 rounded-md bg-gray-200" />
              <p className="w-[100px] h-2 rounded-md bg-gray-200" />
              <p className="w-[100px] h-2 rounded-md bg-gray-200" />
              <p className="w-[100px] h-2 rounded-md bg-gray-200" />
              <p className="w-[100px] h-2 rounded-md bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
