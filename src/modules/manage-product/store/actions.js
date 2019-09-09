import ManageProductService from './service';
const service = new ManageProductService();

export const listProductsNoActive = async (dispatch, params) => {
  const result = await service.listProductNoActive(params);
  return result;
};

export const updateProductActive = async (dispatch, params) => {
  const result = await service.updateActive(params);
  return result;
};
