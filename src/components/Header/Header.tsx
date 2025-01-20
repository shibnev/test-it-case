import { NavLink } from 'react-router-dom';
import './Header.css'
import { useShoppingCart } from '../../context/ShoppingCartContext';

export default function Header() {
  const { cartQuantity } = useShoppingCart();

  return (
    <header className='header'>
      <div className='container header__container'>
        <NavLink
          className={({ isActive }) => isActive ? "header__link active" : "header__link"}
          to='/'>Товары</NavLink>
        <div className='header__cart'>
          <NavLink
            className={({ isActive }) => isActive ? "header__link active" : "header__link"}
            to='/cart'>Корзина</NavLink>
          {
            cartQuantity > 0 &&
            <div className="header__cart-count">{cartQuantity}</div>
          }
        </div>
      </div>
    </header>
  )
}
