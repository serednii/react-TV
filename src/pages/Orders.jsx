import React from 'react';

import Card from '../components/Card/Card';
function Orders({
  orders, 
  isItemAdded, 
  isEditCart, 
  setIsDeleted, 
  setEditCart
}) {
  console.log('render order')


  console.log(orders)

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>My orders</h1>
      </div>

      <div className="d-flex flex-wrap">
        {orders.map((item, index) => (
          <Card 
          key={index} 
          loading={false} 
          {...item} 
          isItemAdded={isItemAdded}
          isEditCart={isEditCart}
           setIsDeleted={setIsDeleted}
           setEditCart={setEditCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
