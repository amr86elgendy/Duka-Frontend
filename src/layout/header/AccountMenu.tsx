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

  const menuItems = [
    { label: 'my orders', icon: AiOutlineUnorderedList, cb: () => {} },
    { label: 'help', icon: IoHelpCircleOutline, cb: () => {} },
    { label: 'log out', icon: IoLogOutOutline, cb: () => logoutUser() },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full flex-col text-sm capitalize text-white focus:outline-none">
          <h3 className="text-neutral-400">
            Hello,{' '}
            <span className="font-medium">{user?.name.split(' ')[0]}</span>
          </h3>
          <div className="inline-flex items-center justify-center gap-1">
            <h2 className="capitalize">account & lists</h2>
            <ChevronDownIcon stroke="white" width={14} height={14} />
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
        <Menu.Items className="absolute right-0 z-50 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {menuItems.map((item) => (
              <Menu.Item key={item.label}>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${
                      active ? 'bg-primary-light text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize`}
                    onClick={item.cb}
                  >
                    <item.icon
                      className={`h-5 w-5 ltr:mr-2 rtl:ml-2 ${
                        active && 'text-white'
                      }`}
                      aria-hidden="true"
                    />
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
