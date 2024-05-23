import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer/Drawer';
import AppContext from './context';
import Deleted from './components/Deleted/Deleted';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import Added from './components/Added/Added';
import Edit from './components/Edit/Edit';
export const baseUrl = 'https://635d74d2ea764497f0dd237e.mockapi.io/';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEditCart, setEditCart] = React.useState(false);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const [isChangeImage, setChangeImage] = React.useState('');
  const [isChangeDescription, setIsChangeDescription] = React.useState('');
  const [isChangePrice, setIsChangePrice] = React.useState('');
  const [isAddedCart, setIsAddedCart] = React.useState(false);

  const [orders, setOrders] = React.useState([]);


  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse, orders] = await Promise.all([
          axios.get(`${baseUrl}cart`),
          axios.get(`${baseUrl}favorites`),
          axios.get(`${baseUrl}sneakers`),
          axios.get(`${baseUrl}orders`)

        ]);

        setIsLoading(false);
        // setCartItems(cartResponse.data);
        // setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
        // setOrders(orders.data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onDeleteToCart = async (id, resourse) => {

    if (resourse === "cart") setCartItems(prev => prev.filter((e, i) => id !== e.id));
    else if (resourse === "sneakers") setItems(prev => prev.filter((e, i) => id !== e.id));
    try {
      await axios.delete(`${baseUrl}${resourse}/${id}`);
    } catch (error) {
      alert(`Ошибка при удалении ${resourse} на сервере`);
    }

  }

  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  const setIsAddedCartSave = async (obj) => {
    try {
      const { data } = await axios.post(`${baseUrl}sneakers`, obj);
      alert(`Товар успішно додано  id = ${data.id}  parentId = ${data.parentId} `)
    } catch (error) {
      alert("Не вдалося добавити новий товар")
    }
  }

  const setIsEditCartSave = async (obj) => {
    console.log(obj)
    try {
      const { data } = await axios.put(`${baseUrl}sneakers/${obj.id}`, obj);
      setItems((prev) => {
        return prev.map(e => {
          if (e.id === data.id) return data
          return e;
        });
      });
      alert(`Дані про товар  змінено  id = ${data.id}  parentId = ${data.parentId} `);
    } catch (error) {
      alert("Не удалось добавить в cart");
    }

  }

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => item.parentId === obj.parentId);
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => item.parentId !== obj.parentId));
        await axios.delete(`${baseUrl}cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(`${baseUrl}cart`, obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      const findObject = favorites.find((favObj) => favObj.parentId === obj.parentId)
      if (findObject) {
        axios.delete(`${baseUrl}favorites/${findObject.id}`);
        setFavorites((prev) => prev.filter((item) => item.parentId !== obj.parentId));
      } else {
        const { data } = await axios.post(`${baseUrl}favorites`, obj,);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`${baseUrl}cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };

  const isItemAdded = (parentId) => {
    return cartItems.some((obj) => obj.parentId === parentId);
  };

  const isFavoriteAdded = (parentId) => {
    return favorites.some((obj) => obj.parentId === parentId);
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        isEditCart,
        setEditCart,
        isAddedCart,
        isItemAdded,
        onAddToCart,
        setCartOpened,
        setCartItems,
        setIsDeleted,
        setSearchValue,
        onChangeSearchInput,
      }}>

      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
          setOrders={setOrders}
          orders={orders}
        />

        <Header
          onClickCart={() => setCartOpened(true)}
          favorites={favorites}
          orders={orders}
        />

        {isDeleted && <Deleted
          key="deleted"
          obj={isDeleted}
          onDeleteToCart={onDeleteToCart}
          setIsDeleted={setIsDeleted}
        />}

        {isEditCart && <Edit
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

        {isAddedCart && <Added
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
            element={<Home
              isFavoriteAdded={isFavoriteAdded}
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
              setIsAddedCart={setIsAddedCart}
            />}
          />

          <Route path="favorites"
            element={<Favorites
              favorites={favorites}
              onAddToFavorite={onAddToFavorite}
            />}
          />

          <Route path="orders"
            element={<Orders
              orders={orders}
              setOrders={setOrders}
            />}

          />

        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
