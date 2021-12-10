import ShopActionTypes from "./shop.type";

export const changeShopParams = (item) => ({
  type: ShopActionTypes.CHANGE_PARAMS,
  payload: item,
});
