import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { TFilterState, useFilterContext } from '@/context/filter';

export default React.memo(function SelectedFilters({
  filters,
}: {
  filters: [keyof TFilterState, string][];
}) {
  const { dispatch } = useFilterContext();
  console.log('selected filters run');
  return (
    <div className="flex flex-wrap gap-2">
      {filters?.map((filter) => (
        <div
          key={filter[1]}
          className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full cursor-default"
        >
          <AiOutlineClose
            size={20}
            onClick={() =>
              dispatch('REMOVE_FILTER', {
                name: filter[0],
                value: filter[1],
              })
            }
            className="p-0.5 rounded cursor-pointer hover:bg-gray-100"
          />
          <span className="capitalize">{filter[0]}</span> -{' '}
          <span>{filter[1]}</span>
        </div>
      ))}
      {filters.length > 1 && (
        <button
          type="button"
          onClick={() => dispatch('CLEAR_ALL_FILTERS')}
          className="px-6 py-2 text-red-500 capitalize rounded-full bg-red-50"
        >
          clear all
        </button>
      )}
    </div>
  );
});
