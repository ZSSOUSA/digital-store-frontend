import { api } from "./api";

export async function searchProducts({ filter = "", limit = 12, page = 1 } = {}) {
  const params = {
    limit,
    page,
  };

  if (filter) params.match = filter; 
  const response = await api.get("/product/search", { params });
  return response.data; 
}

export async function getProductById(id) {
  const response = await api.get(`/product/${id}`);
  return response.data;
}
