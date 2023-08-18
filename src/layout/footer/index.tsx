import { FiHeadphones } from 'react-icons/fi';

export default function Footer() {
  const myAccount = [
    'Product Support',
    'Checkout',
    'Shopping Cart',
    'Wishlist',
    'Terms & Conditions',
    'Redeem Voucher',
  ];
  const quickLinks = ['Store Location', 'My account', 'Order Tracking', 'FAQs'];

  const customerCare = [
    'New Customers',
    'How to use Account',
    'Placing an Order',
    'Payment Methods',
    'Delivery & Dispatch',
    'Problems with Order',
  ];

  return (
    <footer className="bg-primary-dark py-12">
      <div className="container text-white">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-center text-xl font-semibold">
            Sign Up To Newsletter
          </h2>
          <h3 className="w-2/5 text-center text-sm">
            Sign up for all the news about our latest arrivals and get an
            exlusive early access shopping. Join 60.000+ Subscribes and get a
            new discount coupon on every Saturday.
          </h3>
        </div>
        <div className="my-8 grid grid-cols-5 gap-x-4 border-y border-gray-700 py-12 text-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-base font-semibold">Looking For Store?</h2>
            <p>
              34 West Temple Drive Ashbum, East Hartford VA 208686, California,
              USA.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-base font-semibold">Need Help?</h2>
            <div>
              <div className="mb-2 flex items-center gap-2">
                <FiHeadphones size={48} className="text-red-500" />
                <div>
                  <h3 className=" text-neutral-400">Got Question?</h3>
                  <h2 className="text-lg font-semibold text-red-500">
                    +001 123 456 789
                  </h2>
                </div>
              </div>
              <p>
                Opening Hours:
                <br />
                Monday - Friday: 9:00 - 20:00 Saturday: 11:00 - 17:00
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-base font-semibold">My Account</h2>
            <ul className="flex flex-col gap-2">
              {myAccount.map((item) => (
                <li
                  key={item}
                  className="cursor-pointer transition-all duration-200 hover:translate-x-2 hover:text-red-500"
                >
                  <a href="/">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-base font-semibold">My Quick Links</h2>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((item) => (
                <li
                  key={item}
                  className="cursor-pointer transition-all hover:translate-x-2 hover:text-red-500"
                >
                  <a href="/">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-base font-semibold">My Customer Care</h2>
            <ul className="flex flex-col gap-2">
              {customerCare.map((item) => (
                <li
                  key={item}
                  className="cursor-pointer transition-all hover:translate-x-2 hover:text-red-500"
                >
                  <a href="/">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-sm">
          All Rights Reserved. Powered by{' '}
          <span className="text-red-500">Hady Tawfik, Amr Tawfik</span>.
        </p>
      </div>
    </footer>
  );
}
