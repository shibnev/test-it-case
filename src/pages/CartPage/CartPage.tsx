import { useEffect, useState } from 'react';
import Slider from '../../components/Slider/Slider';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { getProduct, getSize } from '../../services/api';
import './CartPage.css'
import formatCurrency from '../../utilities/formatCurrency';
import { IProduct } from '../../types';

type ICartItemData = {
  images: string[];
  name: string;
  colorName: string;
  price: number;
  size: string;
  id: number;
  colorID: number;
  sizeID: number;
}

type IProductSize = {
  label: string;
}

export default function CartPage() {
  const { removeFromCart, cartItems } = useShoppingCart();
  const [cartItemsData, setCartItemsData] = useState<ICartItemData[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const itemsData = await Promise.all(cartItems.map(async ({ id, colorID, sizeID }) => {
        const product: IProduct = await getProduct(id) as IProduct;
        const currentSize = product.colors[colorID].sizes[sizeID]
        const sizeLabel = currentSize
          ? await getSize(currentSize).then((size) => (size as IProductSize).label)
          : 'Size not available';

        return {
          images: product.colors[colorID].images,
          name: product.name,
          colorName: product.colors[colorID].name,
          price: Number(product.colors[colorID].price),
          size: sizeLabel ? sizeLabel : 'Size not available',
          id: id,
          colorID: colorID,
          sizeID: sizeID,
        };
      }));

      setCartItemsData(itemsData);
    };

    fetchCartItems();
  }, [cartItems, removeFromCart]);

  return (
    <div className='cart-page'>
      <div className='cart-page__list'>
        {cartItemsData && cartItemsData.map((el: ICartItemData) => (
          <div
            key={crypto.randomUUID()}
            className='cart-page__item'
          >
            <h2>{el.name}</h2>
            <Slider images={el.images} />
            <p>{el.name}</p>
            <p>цвет: {el.colorName}</p>
            <p>цена: {formatCurrency(el.price)}</p>
            <p>размер: {el.size}</p>
            <button
              onClick={() => removeFromCart(el.id, el.colorID, el.sizeID)}
              className='cart-page__remove-btn'
            >Удалить</button>
          </div>
        ))}
      </div>
    </div>
  )
}
