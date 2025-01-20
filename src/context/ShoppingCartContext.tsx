import { createContext, ReactNode, useContext, useState, useEffect } from 'react'

type ShoppingCartProviderProps = {
  children: ReactNode;
}

type ICartItem = {
  id: number;
  quantity: number;
  colorID: number;
  sizeID: number;
}

type ShoppingCartContext = {
  getItemQuantity: (id: number, colorID: number, sizeID: number) => number;
  increaseItemQuantity: (id: number, colorID: number, sizeID: number) => void;
  decreaseItemQuantity: (id: number, colorID: number, sizeID: number) => void;
  removeFromCart: (id: number, colorID: number, sizeID: number) => void;
  cartQuantity: number;
  cartItems: ICartItem[];
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<ICartItem[]>(() => {
    const storedCartItems = localStorage.getItem('shopping-cart');

    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartQuantity = cartItems.length;

  const itemKey = (id: number, colorID: number, sizeID: number) => `${id}-${colorID}-${sizeID}`;

  function getItemQuantity(id: number, colorID: number, sizeID: number) {
    const item = cartItems.find((el) => itemKey(el.id, el.colorID, el.sizeID) === itemKey(id, colorID, sizeID));
    return item ? item.quantity : 0;
  }

  function increaseItemQuantity(id: number, colorID: number, sizeID: number) {
    const item = cartItems.find((el) => itemKey(el.id, el.colorID, el.sizeID) === itemKey(id, colorID, sizeID));

    if (item) {
      setCartItems((prev) => prev.map((el) => itemKey(el.id, el.colorID, el.sizeID) === itemKey(id, colorID, sizeID) ? { ...el, quantity: el.quantity + 1 } : el));
    } else {
      setCartItems((prev) => [...prev, { id, colorID, sizeID, quantity: 1 }]);
    }
  }

  function decreaseItemQuantity(id: number, colorID: number, sizeID: number) {
    const item = cartItems.find((el) => itemKey(el.id, el.colorID, el.sizeID) === itemKey(id, colorID, sizeID));
    if (item && item.quantity > 1) {
      setCartItems((prev) => prev.map((el) => itemKey(el.id, el.colorID, el.sizeID) === itemKey(id, colorID, sizeID) ? { ...el, quantity: el.quantity - 1 } : el));
    } else {
      setCartItems((prev) => prev.filter((el) => itemKey(el.id, el.colorID, el.sizeID) !== itemKey(id, colorID, sizeID)));
    }
  }

  function removeFromCart(id: number, colorID: number, sizeID: number) {
    setCartItems((prev) => prev.filter((el) => itemKey(el.id, el.colorID, el.sizeID) !== itemKey(id, colorID, sizeID)));
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
