import products from "../data/products";

export const useProducts = () => {
  return {
    data: { items: products },
    isLoading: false,
  };
};
