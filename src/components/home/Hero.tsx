import tablets from '@/assets/tablets.png';
import mobile from '@/assets/mobile.jpg';

export default function Hero() {
  return (
    <div className="mb-12 grid grid-cols-[2fr_1fr] gap-4">
      <div className="relative row-span-2 overflow-hidden rounded-md ">
        <div className="absolute left-24 top-1/2 -translate-y-1/2 text-white">
          <h2 className="mb-6 inline-block rounded-sm bg-yellow-300 px-4 py-1 text-left text-sm font-semibold uppercase text-black">
            trending items
          </h2>
          <h1 className="mb-2 text-3xl font-semibold capitalize leading-normal">
            mega sale <br />
            brilliant shopping day
          </h1>
          <p className="mb-10 text-lg">Discount 50% OFF This Week</p>
          <button
            type="button"
            className="rounded-md bg-red-500 px-8 py-4 font-semibold "
          >
            Discover Now
          </button>
        </div>
        <img className="h-full w-full object-cover" src={mobile} alt="" />
      </div>

      <div className="flex items-center rounded-md bg-[#F0567A] px-8 text-white">
        <div>
          <h2 className="mb-6 inline-block rounded-sm bg-white px-4 py-1 text-left text-sm font-semibold uppercase text-[#F0567A]">
            mobile
          </h2>
          <p className="text-2xl">DEALS 20% OFF from $690.99</p>
        </div>
        <div>
          <img width={300} src={tablets} alt="tablets" />
        </div>
      </div>

      <div className="flex items-center rounded-md bg-[#965EE3] px-8 text-white">
        <div>
          <h2 className="mb-6 inline-block rounded-sm bg-white px-4 py-1 text-left text-sm font-semibold uppercase text-[#965EE3]">
            week deals
          </h2>
          <p className="text-2xl">DEALS 20% OFF from $690.99</p>
        </div>
        <div>
          <img width={300} src={tablets} alt="tablets" />
        </div>
      </div>
    </div>
  );
}
