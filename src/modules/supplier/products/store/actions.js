import productService from './service';
const service = new productService();

export const requestCategory = async (dispatch, params) => {
  const result = await service.requestCategory(params);
  return result;
};

export const searchProductTable = async (dispatch, param) => {
  const result = await service.listProductTable(param);
  return result;
};

export const searchProductDetailTable = async (dispatch, param) => {
  const result = await service.listProductDetailTable(param);
  return result;
};

export const updateProduct = async (dispatch, param) => {
  const result = await service.updateQuantityProduct(param);
  return result;
};

export const updateProductDetail = async (dispatch, param) => {
  const result = await service.updateQuantityProductDetail(param);
  return result;
};

export const resetPoductQuantity = async (dispatch, param) => {
  const result = await service.resetProduct(param);
  return result;
};

export const resetProductDetailQuantity = async (dispatch, param) => {
  const result = await service.resetProductDetail(param);
  return result;
};

export const searchProductNoActive = async (dispatch, param) => {
  const result = await service.listProductNoActive(param);
  return result;
};

export const searchProductDetailNoActive = async (dispatch, param) => {
  const result = await service.listProductDetailNoActive(param);
  return result;
};
