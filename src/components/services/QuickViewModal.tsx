import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { HiCheck } from 'react-icons/hi';
import { Dialog, Transition } from '@headlessui/react';
import { useQuickViewContext } from '@/context/quickView';
import FormatNumber from '@/utils/format-number';
import AddToCartBtn from '@/utils/addToCartBtn';

export default function QuickViewModal() {
  const { t } = useTranslation();
  const { opened, product, dispatch } = useQuickViewContext();

  return (
    <Transition show={opened} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        onClose={() => dispatch('REMOVE_VIEW')}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all md:w-5/6 lg:w-3/5 2xl:w-1/2">
                <div className="grid grid-cols-2 gap-8">
                  {/* --------- IMG ----------- */}
                  <div
                    className="items-cneter flex w-full cursor-zoom-in justify-center overflow-hidden rounded-md border border-gray-200 p-4"
                    // onClick={() => dispatch(openPictureModel())}
                  >
                    <img
                      className="w-[505px] object-contain"
                      src={product?.image}
                      alt=""
                    />
                  </div>

                  {/* --------- Details ----------- */}
                  <div className="flex flex-col">
                    {/* <Link to={`/${product?.id}`}> */}
                    <h1 className="mb-2 text-xl font-semibold text-blue-700">
                      {product?.name}
                    </h1>
                    {/* </Link> */}
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex text-yellow-500">
                        {/* <RatingStars averageRating={product?.averageRating} /> */}
                      </div>
                      <p className="border-l px-4 text-sm text-gray-400">
                        {product?.numReviews} Review
                      </p>
                    </div>
                    <div className="mb-6 flex items-center gap-2 border-b border-gray-200 pb-6">
                      <FormatNumber value={product?.price ?? 0} />
                    </div>
                    <ul className="mb-6 text-sm leading-loose text-gray-500">
                      <li>{product?.description}</li>
                    </ul>
                    {/* colors */}
                    <div className="mb-6">
                      <h1 className="mb-2 ">Color:</h1>
                      <div className="flex gap-2">
                        {product?.colors.map((color) => (
                          <div
                            key={color._id}
                            className="flex h-6 w-6 items-center justify-center rounded-md"
                            style={{
                              backgroundColor: color.name,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
