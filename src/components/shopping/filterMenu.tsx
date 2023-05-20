import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaCheck } from 'react-icons/fa';
import { BiChevronDown } from 'react-icons/bi';
import { TFilterState, useFilterContext } from '@/context/filter';

type TFilterMenu<TData> = {
  name: keyof TFilterState;
  multiple: boolean;
  options: Record<keyof TData, string>[];
};

export default function FilterMenu({
  name,
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
          className={`hover:bg-gray-300 flex items-center gap-1 relative h-full cursor-pointer rounded-full bg-gray-100 py-2 px-6 text-left outline-none ${
            filters[name] && filters[name].length > 0
              ? 'border border-gray-700'
              : 'border border-transparent'
          }`}
        >
          <span className="block font-semibold capitalize truncate">
            {name}
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
            className={`absolute z-10 grid py-2 mt-2 overflow-hidden border border-gray-300 rounded-md outline-none w-max bg-gray-50 sm:text-sm ${
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
                  `flex gap-2 relative cursor-pointer select-none py-2 px-6 ${
                    active ? 'bg-gray-100 text-red-500' : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <div className="relative flex items-center gap-2">
                    <span
                      className={`w-5 h-5 flex justify-center items-center rounded-full border-2 cursor-pointer ${
                        selected
                          ? 'bg-red-500 border-none '
                          : 'bg-gray-50 border-gray-300 '
                      }`}
                    >
                      {multiple ? (
                        <FaCheck
                          size={12}
                          className={`${
                            selected ? 'text-white' : 'text-gray-50'
                          } absolute left-[4px] top-1 pointer-events-none`}
                        />
                      ) : (
                        <div
                          className={`w-2 h-2  rounded-full pointer-events-none ${
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
