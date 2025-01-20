import { Link } from 'react-router-dom';
import './HomePage.css';
import { useState, useEffect } from 'react';
import { getProducts } from '../../services/api';
import { IProduct } from '../../types';

export default function HomePage() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data as IProduct[]);
      })
  }, [])

  return (
    <div className='home-page'>
      <div className='home-page__list'>
        {products && products.map((el: IProduct) => (
          <Link
            to={`/product/${el.id}`}
            key={el.id}
            className='home-page__product'
          >
            <img
              src={el.colors[0].images[0]}
              alt={el.name}
              className='home-page__img'
            />
            <p>{el.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
