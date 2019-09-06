import AllProducts from './service';
const service = new AllProducts();

export const searchProducts = async (dispatch, params) => {
  const result = await service.searchProducts(params);
  return result;
};

export const optionSetting = async (dispatch, params) => {
  const result = await service.optionSettingDetail(params);
  return result;
};

export const getProductDetail = async (dispatch, params) => {
  const result = await service.requestProductDetail(params);
  return result;
};

export const showProductDetails = async (dispatch, params) => {
  const result = await service.showProductDetail(params);
  return result;
};

export const listCatalog = async (dispatch, param) => {
  const result = await service.getListCatalog(param);
  return result;
};

export const checkExistProduct = async (dispatch, param) => {
  const result = await service.checkExist(param);
  return result;
};

export const addProductForSupplier = async (dispatch, param) => {
  const result = await service.addProductDetail(param);
  return result;
};
