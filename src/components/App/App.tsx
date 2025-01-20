import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';
import CartPage from '../../pages/CartPage/CartPage';
import ProductPage from '../../pages/ProductPage/ProductPage';
import Header from '../Header/Header';
import { ShoppingCartProvider } from '../../context/ShoppingCartContext';

function App() {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <div className='app'>
          <Header />
          <main className='app__main'>
            <div className="container">
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='*' element={<div>404</div>} />
                <Route path='/product/:id' element={<ProductPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
