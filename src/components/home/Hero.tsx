import tablets from '@/assets/tablets.png';
import mobile from '@/assets/mobile.jpg';

export default function Hero() {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4 mb-12">
      <div className="relative row-span-2 overflow-hidden rounded-md ">
        <div className="absolute text-white -translate-y-1/2 left-24 top-1/2">
          <h2 className="inline-block px-4 py-1 mb-6 text-sm font-semibold text-left text-black uppercase bg-yellow-300 rounded-sm">
            trending items
          </h2>
          <h1 className="mb-2 text-3xl font-semibold leading-normal capitalize">
            mega sale <br />
            brilliant shopping day
          </h1>
          <p className="mb-10 text-lg">Discount 50% OFF This Week</p>
          <button
            type="button"
            className="px-8 py-4 font-semibold bg-red-500 rounded-md "
          >
            Discover Now
          </button>
        </div>
        <img className="object-cover w-full h-full" src={mobile} alt="" />
      </div>

      <div className="bg-[#F0567A] text-white rounded-md px-8 flex items-center">
        <div>
          <h2 className="uppercase mb-6 py-1 px-4 bg-white text-left text-[#F0567A] font-semibold inline-block text-sm rounded-sm">
            mobile
          </h2>
          <p className="text-2xl">DEALS 20% OFF from $690.99</p>
        </div>
        <div>
          <img width={300} src={tablets} alt="tablets" />
        </div>
      </div>

      <div className="bg-[#965EE3] text-white rounded-md px-8 flex items-center">
        <div>
          <h2 className="uppercase mb-6 py-1 px-4 bg-white text-left text-[#965EE3] font-semibold inline-block text-sm rounded-sm">
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
