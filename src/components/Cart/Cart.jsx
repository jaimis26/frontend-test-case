import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartCount,
  selectCartTotalPrice,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../store/slices/cartSlice";
import { CartItem } from "./CartItem";

export function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const totalPrice = useSelector(selectCartTotalPrice);

  const [isOpen, setIsOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      dispatch(clearCart());
      setIsCheckingOut(false);
      setOrderSuccess(true);
      setTimeout(() => {
        setOrderSuccess(false);
        setIsOpen(false);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="cart">
      <button
        className="cart-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Корзина ({cartCount})
      </button>

      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h3>Корзина</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="cart-items">
            {orderSuccess ? (
              <p>Заказ успешно оформлен!</p>
            ) : cart.length === 0 ? (
              <p>Корзина пуста</p>
            ) : (
              cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))
            )}
          </div>

          <div className="cart-footer">
            <div className="total">Итого: ${totalPrice}</div>
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={cart.length === 0 || isCheckingOut}
            >
              {isCheckingOut ? "Оформляем..." : "Оформить заказ"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
