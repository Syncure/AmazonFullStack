export const initialState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "ADD_TO_BASKET":
      //lOGIC FOR ADDING ITEM TO BASKET
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "REMOVE_FROM_BASKET":
      //LOGIC FOR REMOVING ITEM FROM BASKET

      //se clona el carrito
      let newBasket = [...state.basket];

      //Nos fijamos si el producto existe
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      if (index >= 0) {
        //Si existe en el carrito, se va borrar...
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `No se puede borrar (id: ${action.id}) no está en el carrito!!! `
        );
      }

      return { ...state, basket: newBasket };
    default:
      return state;
  }
};

export default reducer;
