import React from 'react';
import axios from 'axios';

import Info from '../Info';
import { useCart } from '../../hooks/useCart';
import {baseUrl} from '../../App';
import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ setOrders, onClose, onRemove, setCartOpened, setCartItems, cartItems = [], opened }) {
  console.log('render drawer')
  
  const { totalPrice } = useCart(cartItems );
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${baseUrl}orders`, {
        items: cartItems,
      });
      console.log(data)
      // setOrders(orders.reduce((prev, obj) => [...prev, ...obj.items], []));
      setOrders(prev => [...prev, ...data.items])
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        console.log(item)
        await axios.delete(`${baseUrl}cart/` + item.id);
        await delay(1000);
      }

    } catch (error) {
      alert('Ошибка при создании заказа :(');
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer__empty} onClick={onClose} ></div>
      <div className={styles.drawer}>

        <h2 className="d-flex justify-between mb-30">
        Basket <img onClick={onClose} className="cu-p" src="images/btn-remove.svg" alt="Close" />
        </h2>

        {cartItems.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {cartItems.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.urlImage})` }}
                    className="cartItemImg"></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="images/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Total:</span>
                  <div></div>
                  <b>{totalPrice} CZK. </b>
                </li>
                <li>
                  <span>Tax 5%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} CZK. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
              Checkout <img src="images/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
          setCartOpened={setCartOpened}
            title={isOrderComplete ? 'Order is processed!' : 'Cart is empty'}
            description={
              isOrderComplete
                ? `Your order #${orderId} will be transferred to courier delivery soon`
                : 'Add at least one pair of sneakers to complete your order.'
            }
            image={isOrderComplete ? 'images/complete-order.jpg' : 'images/empty-cart.jpg'}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
