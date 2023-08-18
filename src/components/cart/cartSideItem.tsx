import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteCartItem, TCartItem } from '@/apis/cart';
import FormatNumber from '@/utils/format-number';
import LoadingOverlay from '@/utils/overlay';
// import { DrawerClose } from '../UI/drawer';

interface ICartSideItem extends TCartItem {
  DrawerClose: React.JSXElementConstructor<any>;
}

export default function CartSideItem({
  _id,
  amount,
  product,
  selectedColor,
  DrawerClose,
}: ICartSideItem) {
  const { mutate: deleteItem, isLoading: loadDelete } = useDeleteCartItem();
  console.log('CartSideItem run');

  return (
    <li key={_id} className="relative flex gap-4 py-6">
      <LoadingOverlay visible={loadDelete} />
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-contain object-center p-2"
        />
      </div>

      <div className="flex flex-1 flex-col justify-evenly">
        <div className="flex justify-between text-xs font-medium text-gray-900">
          <h3>
            <DrawerClose asChild>
              <Link to={`/products/${product._id}`} className="line-clamp-2">
                {product.name}
              </Link>
            </DrawerClose>
          </h3>
          <FormatNumber value={product.price} withCurrency={false} />
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-4 w-4 rounded-sm"
            style={{ backgroundColor: selectedColor?.name }}
          />
          <p
            className="capitaliz text-sm"
            style={{ color: selectedColor?.name }}
          >
            {selectedColor?.name}
          </p>
        </div>

        <div className="flex items-end justify-between text-sm">
          <p className="font-medium">
            Qty : <span className="text-gray-500">{amount}</span>
          </p>

          <button
            type="button"
            className="font-medium text-red-600 hover:text-red-500"
            onClick={() => deleteItem(_id)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
