import React from 'react';

import Card from '../components/Card/Card';
import styles from './Home.module.scss';
import TitleCards from '../components/TitleCards/TitleCards';
function Home({
  items,
  searchValue,
  onAddToFavorite,
  onAddToCart,
  isLoading,
  setIsAddedCart,
  isFavoriteAdded,
  isItemAdded, 
  isEditCart, 
  setIsDeleted, 
  setEditCart,
  onChangeSearchInput, 
  setSearchValue,
}) {
  console.log('render home')
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        k={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
        isOrders={false}
        isFavorite={isFavoriteAdded(!isLoading && item.parentId)}
        isItemAdded={isItemAdded}
         isEditCart={isEditCart}
          setIsDeleted={setIsDeleted}
          setEditCart={setEditCart}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
         <TitleCards 
         key="titleCards" 
         onChangeSearchInput={onChangeSearchInput} 
         searchValue={searchValue} 
         setSearchValue={setSearchValue}
         />
        <div className={styles.cardsAdded} >
                {<div className={styles.added} onClick={() => setIsAddedCart(true)} >
                    <img src='images/added.svg' alt="icon"/>
                </div>}
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
