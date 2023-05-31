import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

type TModalComponent = {
  children: React.ReactNode;
  opened: boolean;
  onClose: () => void;
};

export default function DrawerView({
  children,
  opened,
  onClose,
}: TModalComponent) {
  const { i18n } = useTranslation();
  return (
    <Transition show={opened} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 end-0 flex max-w-full ps-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom={`${
                  i18n.language === 'en'
                    ? 'translate-x-full'
                    : '-translate-x-full'
                }`}
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo={`${
                  i18n.language === 'en'
                    ? 'translate-x-full'
                    : '-translate-x-full'
                }`}
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
