export const useCart = (cartItems) => {
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  return { totalPrice };
};
