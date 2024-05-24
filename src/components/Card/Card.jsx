import React from 'react';
import ContentLoader from 'react-content-loader';

import AppContext from '../../context';

import styles from './Card.module.scss';

function Card({
  parentId,
  id,
  title,
  urlImage,
  price,
  onFavorite,
  onPlus,
  isFavorite = false,
  loading = false,
  k,
  isOrders=true
}) {
  console.log('render card')

  const { isItemAdded, isEditCart, setIsDeleted, setEditCart } = React.useContext(AppContext);
  const obj = { id, parentId, title, urlImage, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const handleFavorite = () => {
    onFavorite(obj);
  };

  return (
    <div className={styles.card}  >
      {loading ? (
          <ContentLoader
          speed={2}
          width={600}
          height={400}
          viewBox="0 0 600 400"
          backgroundColor="#e9e2e2"
          foregroundColor="#ecebeb">
          <rect x="0" y="105" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="-1" rx="10" ry="10" width="150" height="90" />
          <rect x="2" y="134" rx="3" ry="3" width="93" height="15" />
          <rect x="5" y="174" rx="8" ry="8" width="80" height="24" />
          <rect x="118" y="165" rx="8" ry="8" width="32" height="32" />
          </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={handleFavorite}>
              <img src={isFavorite ? 'images/liked.svg' : 'images/unliked.svg'} alt="Unliked" />
            </div>
          )}
          {isOrders || <div className={styles.edit} onClick={() => setEditCart(obj)}>
            <img src='images/edit.svg' alt="tv"/>
          </div>}
          {isOrders || <div className={styles.deleted} onClick={() => !isEditCart && setIsDeleted(obj)}>
            <img src='images/delete.svg' alt="tv" />
          </div>}
          <img width="100%" height={135} src={urlImage} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Cena:</span>
              <b>{price} CZK.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(parentId) ? 'images/btn-checked.svg' : 'images/btn-plus.svg'}
                alt="Plus"
              />
            )}
          </div>
          <div>Id  {id}</div>
          <div>parentId  {parentId}</div>
        </>
      )}
    </div>
  );
}

export default Card;
