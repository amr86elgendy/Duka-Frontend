import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { TFilterState, useFilterContext } from '@/context/filter';

export default React.memo(function SelectedFilters({
  filters,
}: {
  filters: [keyof TFilterState, string][];
}) {
  const { dispatch } = useFilterContext();
  return (
    <div className="flex flex-wrap gap-2">
      {filters?.map((filter) => (
        <div
          key={filter[1]}
          className="flex cursor-default items-center gap-2 rounded-full border border-gray-300 px-6 py-2"
        >
          <AiOutlineClose
            size={20}
            onClick={() =>
              dispatch('REMOVE_FILTER', {
                name: filter[0],
                value: filter[1],
              })
            }
            className="cursor-pointer rounded p-0.5 hover:bg-gray-100"
          />
          <span className="text-sm capitalize">{filter[0]}</span> -{' '}
          <span className="text-sm">{filter[1]}</span>
        </div>
      ))}
      {filters.length > 1 && (
        <button
          type="button"
          onClick={() => dispatch('CLEAR_ALL_FILTERS')}
          className="rounded-full bg-red-50 px-6 py-2 text-sm font-medium capitalize text-red-500"
        >
          clear all
        </button>
      )}
    </div>
  );
});
