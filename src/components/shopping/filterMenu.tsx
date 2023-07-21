import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaCheck } from 'react-icons/fa';
import { BiChevronDown } from 'react-icons/bi';
import { TFilterState, useFilterContext } from '@/context/filter';

type TFilterMenu<TData> = {
  name: keyof TFilterState;
  label: string;
  multiple: boolean;
  options: Record<keyof TData, string>[];
};

export default function FilterMenu({
  name,
  label,
  multiple,
  options,
}: TFilterMenu<{ _id: string; name: string }>) {
  const { filters, dispatch } = useFilterContext();

  return (
    <Listbox
      value={filters[name]}
      onChange={(value) => dispatch('SET_FILTER', { name, value })}
      multiple={multiple}
    >
      <div className="h-full">
        <Listbox.Button
          className={`relative flex h-full cursor-pointer items-center gap-1 rounded-full bg-gray-100 px-6 py-2 text-left outline-none hover:bg-gray-300 ${
            filters[name] && filters[name].length > 0
              ? 'border border-gray-700'
              : 'border border-transparent'
          }`}
        >
          <span className="block truncate text-sm font-semibold capitalize">
            {label}
          </span>
          <BiChevronDown
            size={24}
            className="text-gray-700 "
            aria-hidden="true"
          />
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={`absolute z-10 mt-2 grid w-max overflow-hidden rounded-md border border-gray-300 bg-gray-50 py-2 outline-none sm:text-sm ${
              options.length <= 5
                ? 'grid-cols-1'
                : options.length <= 10
                ? 'grid-cols-2'
                : 'grid-cols-3'
            }`}
          >
            {options.map((option) => (
              <Listbox.Option
                key={option._id}
                value={`${option._id},${option.name}`}
                className={({ active }) =>
                  `relative flex cursor-pointer select-none gap-2 px-6 py-2 ${
                    active ? 'bg-gray-100 text-red-500' : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <div className="relative flex items-center gap-2">
                    <span
                      className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 ${
                        selected
                          ? 'border-none bg-red-500 '
                          : 'border-gray-300 bg-gray-50 '
                      }`}
                    >
                      {multiple ? (
                        <FaCheck
                          size={12}
                          className={`${
                            selected ? 'text-white' : 'text-gray-50'
                          } pointer-events-none absolute left-1 top-1`}
                        />
                      ) : (
                        <div
                          className={`pointer-events-none h-2  w-2 rounded-full ${
                            selected ? 'bg-white' : 'bg-gray-50'
                          }`}
                        />
                      )}
                    </span>
                    <span className="capitalize">{option.name}</span>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
