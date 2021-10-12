export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.productCode === cartItemToAdd.productCode
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.productCode === cartItemToAdd.productCode
        ? { ...cartItem, quantity: parseInt(cartItem.quantity)}
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: parseInt(cartItemToAdd.quantity) }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.productCode === cartItemToRemove.productCode
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.productCode !== cartItemToRemove.productCode);
  }

  return cartItems.map((cartItem) =>
    cartItem.productCode === cartItemToRemove.productCode
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};