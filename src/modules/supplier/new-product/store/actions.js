import CreateProduct from './service';
const service = new CreateProduct();

export const getCategory = async (dispatch, params) => {
  const result = await service.requestCategory(params);
  return result;
};

export const addInfoProduct = async (dispatch, params) => {
  const result = await service.requestInfoProduct(params);
  return result;
};

export const getNameCatalog = async (dispatch, params) => {
  const result = await service.requestNameCatalog(params);
  return result;
};

export const addProductCatalog = async (dispatch, params) => {
  const result = await service.requestProductCatalog(params);
  return result;
};

export const getColor = async (dispatch, params) => {
  const result = await service.requestColor(params);
  return result;
};

export const getSize = async (dispatch, params) => {
  const result = await service.requestSize(params);
  return result;
};

// export const addProductImage = async (dispatch, params) => {
//   const result = await service.requestProductImage(params);
//   return result;
// };

export const checkExistProduct = async (dispatch, params) => {
  const result = await service.compareProduct(params);
  return result;
};
