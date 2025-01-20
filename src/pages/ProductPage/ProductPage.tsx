import { useParams } from 'react-router-dom';
import './ProductPage.css';
import { useEffect, useState } from 'react';
import { getProduct, getSizes } from '../../services/api';
import { IProduct } from '../../types';
import formatCurrency from '../../utilities/formatCurrency';
import Slider from '../../components/Slider/Slider';
import { useShoppingCart } from '../../context/ShoppingCartContext';

export default function ProductPage() {
  const { id } = useParams();
  const { increaseItemQuantity } = useShoppingCart();
  const [product, setProduct] = useState<IProduct>();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [sizes, setSizes] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(Number(id));

        setProduct(data as IProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const fetchSizes = async () => {
      try {
        const data = await getSizes() as { id: number; label: string }[];

        if (product) {
          const availableSizes = product.colors[selectedColor].sizes.map((size) => {
            const foundSize = data.find((el: { id: number; }) => el.id === size);

            return foundSize ? foundSize.label : '';
          });

          setSizes(availableSizes);
        }
      } catch (error) {
        console.error('Error fetching sizes:', error);
      }
    };

    fetchProduct();
    fetchSizes();
  }, [id, selectedColor, product]);

  const handleAddToCart = () => {
    if (product) {
      increaseItemQuantity(product.id, selectedColor, selectedSize);
    }
  };

  return (
    <div className='product-page'>
      {product && (
        <>
          <h2 className='product-page__title'>{product.name}</h2>
          <div className="product-page__row">
            <div className="product-page__col">
              <div className='product-page__colors'>
                {product.colors.map((color) => (
                  <div className='product-page__color' key={color.id}>
                    <button
                      className='product-page__color-btn'
                      onClick={() => setSelectedColor(color.id - 1)}
                    >
                      <img src={color.images[0]} alt="" />
                    </button>
                    <p className='product-page__color-label'>{color.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="product-page__col">
              <p>цвет: {product.colors[selectedColor].name}</p>
              <p>цена: {formatCurrency(+product.colors[selectedColor].price)}</p>
              <p>описание: {product.colors[selectedColor].description}</p>
              {sizes.length ? (
                <div>
                  <p>размеры: </p>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(+e.target.value)}
                  >
                    {sizes.map((size, index) => (
                      <option key={size} value={index}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <h4>товара нет в наличии</h4>
              )}
            </div>
            <div className="product-page__col">
              <Slider images={product.colors[selectedColor].images} />
            </div>
          </div>
          {sizes.length > 0 && (
            <button className='product-page__buy' onClick={handleAddToCart}>
              Купить
            </button>
          )}
        </>
      )}
    </div>
  );
}
