import supplierOrders from './service';

const service = new supplierOrders();

export const getNameCategory = async (dispatch, params) => {
  const result = await service.getNameCategory(params);
  return result;
};
export const listProductForSupplier = async (dispatch, param) => {
  const result = await service.getListProduct(param);
  return result;
};

export const getProductOrder = async (dispatch, param) => {
  const result = await service.getListProductOrder(param);
  return result;
};

export const getProductDetailOrder = async (dispatch, param) => {
  const result = await service.getListProductDetailOrder(param);
  return result;
};

export const updateStatusPayment = async (dispatch, param) => {
  const result = await service.updateStatus(param);
  return result;
};
