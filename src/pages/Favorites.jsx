import React from 'react';
import Card from '../components/Card/Card';

function Favorites({
  favorites, 
  onAddToFavorite,
  isItemAdded, 
  isEditCart, 
  setIsDeleted, 
  setEditCart,

}) {
  console.log('render favorites')

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>My bookmarks</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favorites.map((item, index) => (
          <Card 
          key={index} 
          isOrders={false}  
          isFavorite={true} 
          onFavorite={onAddToFavorite} 
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

export default Favorites;
