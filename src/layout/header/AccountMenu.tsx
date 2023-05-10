import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { IoHelpCircleOutline, IoLogOutOutline } from 'react-icons/io5';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { useLogout } from '@/apis/auth';
import { useAuthContext } from '@/context/auth';
import { ChevronDownIcon } from '@/assets/icons';

export default function AccountMenu() {
  const { refetch: logoutUser } = useLogout();
  const { user } = useAuthContext();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex flex-col w-full text-sm text-white capitalize focus:outline-none">
          <h3 className="text-neutral-400">
            Hello,{' '}
            <span className="font-medium">{user?.name.split(' ')[0]}</span>
          </h3>
          <div className="inline-flex justify-center gap-1">
            <h2 className="capitalize">account & lists</h2>
            <ChevronDownIcon
              stroke="white"
              fill="white"
              width={20}
              height={20}
            />
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-44 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active ? 'bg-primary-1 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize`}
                >
                  <AiOutlineUnorderedList
                    className={`w-5 h-5 mr-2 ${active && 'text-white'}`}
                    aria-hidden="true"
                  />
                  my orders
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active ? 'bg-primary-1 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize`}
                >
                  <IoHelpCircleOutline
                    className={`w-5 h-5 mr-2 ${active && 'text-white'}`}
                    aria-hidden="true"
                  />
                  help
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active ? 'bg-primary-1 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize`}
                  onClick={() => logoutUser()}
                >
                  <IoLogOutOutline
                    className={`w-5 h-5 mr-2 ${active && 'text-white'}`}
                    aria-hidden="true"
                  />
                  log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
