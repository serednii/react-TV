import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer/Drawer';
import Deleted from './components/Deleted/Deleted';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import Added from './components/Added/Added';
import Edit from './components/Edit/Edit';

export const baseUrl = 'https://635d74d2ea764497f0dd237e.mockapi.io/';

const MemoizedHeader = React.memo(Header);
const MemoizedDrawer = React.memo(Drawer);
const MemoizedDeleted = React.memo(Deleted);
const MemoizedHome = React.memo(Home);
const MemoizedFavorites = React.memo(Favorites);
const MemoizedOrders = React.memo(Orders);
const MemoizedAdded = React.memo(Added);
const MemoizedEdit = React.memo(Edit);

function App() {
  console.log('render app');

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditCart, setEditCart] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isChangeImage, setChangeImage] = useState('');
  const [isChangeDescription, setIsChangeDescription] = useState('');
  const [isChangePrice, setIsChangePrice] = useState('');
  const [isAddedCart, setIsAddedCart] = useState(false);
  const [orders, setOrders] = useState([]);
  const [click, setClick] = useState(true);

  console.log(click)
  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse, ordersResponse] = await Promise.all([
          axios.get(`${baseUrl}cart`),
          axios.get(`${baseUrl}favorites`),
          axios.get(`${baseUrl}sneakers`),
          axios.get(`${baseUrl}orders`)
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
        setOrders(ordersResponse.data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onDeleteToCart = useCallback(async (id, resource) => {
    if (resource === "cart") setCartItems(prev => prev.filter((e) => id !== e.id));
    else if (resource === "sneakers") setItems(prev => prev.filter((e) => id !== e.id));
    try {
      await axios.delete(`${baseUrl}${resource}/${id}`);
    } catch (error) {
      alert(`Ошибка при удалении ${resource} на сервере`);
    }
  }, []);

  const onChangeSearchInput = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const setIsAddedCartSave = useCallback(async (obj) => {
    try {
      const { data } = await axios.post(`${baseUrl}sneakers`, obj);
      alert(`Товар успешно добавлен id = ${data.id} parentId = ${data.parentId}`);
    } catch (error) {
      alert("Не удалось добавить новый товар");
    }
  }, []);

  const setIsEditCartSave = useCallback(async (obj) => {
    try {
      const { data } = await axios.put(`${baseUrl}sneakers/${obj.id}`, obj);
      setItems((prev) => prev.map(e => (e.id === data.id ? data : e)));
      alert(`Данные о товаре изменены id = ${data.id} parentId = ${data.parentId}`);
    } catch (error) {
      alert("Не удалось изменить данные товара");
    }
  }, []);

  const onAddToCart = useCallback(async (obj) => {
    try {
      const findItem = cartItems.find((item) => item.parentId === obj.parentId);
      if (findItem) {
        await axios.delete(`${baseUrl}cart/${findItem.id}`);
        setCartItems((prev) => prev.filter((item) => item.parentId !== obj.parentId));
      } else {
        const { data } = await axios.post(`${baseUrl}cart`, obj);
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }, [cartItems]);

  const onAddToFavorite = useCallback(async (obj) => {
    try {
      const findObject = favorites.find((favorite) => favorite.parentId === obj.parentId);
      if (findObject) {
        await axios.delete(`${baseUrl}favorites/${findObject.id}`);
        setFavorites((prev) => prev.filter((item) => item.parentId !== obj.parentId));
      } else {
        const { data } = await axios.post(`${baseUrl}favorites`, obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }, [favorites]);

  const onRemoveItem = useCallback(async (id) => {
    try {
      await axios.delete(`${baseUrl}cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  }, []);

  const isItemAdded = useCallback((parentId) => cartItems.some((obj) => obj.parentId === parentId), [cartItems]);

  const isFavoriteAdded = useCallback((parentId) => favorites.some((obj) => obj.parentId === parentId), [favorites]);

  return (
    <div className="wrapper clear">
      <button onClick={() => setClick(prev => !prev)}>CLICK</button>
      <MemoizedDrawer
        items={cartItems}
        onClose={() => setCartOpened(false)}
        onRemove={onRemoveItem}
        opened={cartOpened}
        setOrders={setOrders}
        orders={orders}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      <MemoizedHeader
        onClickCart={() => setCartOpened(true)}
        favorites={favorites}
        orders={orders}
        cartItems={cartItems}
      />

      {isDeleted && <MemoizedDeleted
        key="deleted"
        obj={isDeleted}
        onDeleteToCart={onDeleteToCart}
        setIsDeleted={setIsDeleted}
      />}

      {isEditCart && <MemoizedEdit
        key="edit"
        obj={isEditCart}
        setEditCart={setEditCart}
        isChangeImage={isChangeImage}
        isChangeDescription={isChangeDescription}
        isChangePrice={isChangePrice}
        setIsEditCartSave={setIsEditCartSave}
        setChangeImage={setChangeImage}
        setIsChangeDescription={setIsChangeDescription}
        setIsChangePrice={setIsChangePrice}
      />}

      {isAddedCart && <MemoizedAdded
        key="added"
        isChangeImage={isChangeImage}
        isChangeDescription={isChangeDescription}
        isChangePrice={isChangePrice}
        setIsAddedCartSave={setIsAddedCartSave}
        setChangeImage={setChangeImage}
        setIsChangeDescription={setIsChangeDescription}
        setIsChangePrice={setIsChangePrice}
        setIsAddedCart={setIsAddedCart}
      />}

      <Routes>
        <Route path=""
          element={<MemoizedHome
            isFavoriteAdded={isFavoriteAdded}
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
            setIsAddedCart={setIsAddedCart}
            isItemAdded={isItemAdded}
            isEditCart={isEditCart}
            setIsDeleted={setIsDeleted}
            setEditCart={setEditCart}
            onChangeSearchInput={onChangeSearchInput}
            setSearchValue={setSearchValue}
          />}
        />

        <Route
          path="favorites"
          element={<MemoizedFavorites
            favorites={favorites}
            onAddToFavorite={onAddToFavorite}
            isItemAdded={isItemAdded}
            isEditCart={isEditCart}
            setIsDeleted={setIsDeleted}
            setEditCart={setEditCart}
          />}
        />

        <Route path="orders"
          element={<MemoizedOrders
            setCartOpened={setCartOpened}
            orders={orders}
            setOrders={setOrders}
            isItemAdded={isItemAdded}
            isEditCart={isEditCart}
            setIsDeleted={setIsDeleted}
            setEditCart={setEditCart}
          />}
        />
      </Routes>
    </div>
  );
}

export default App;

