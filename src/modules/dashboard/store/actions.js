import dashboardService from './service';
const service = new dashboardService();

export const quantityProduct = async (dispatch, params) => {
  const result = await service.countProduct(params);
  return result;
};

export const quantityPayment = async (dispatch, params) => {
  const result = await service.countPayment(params);
  return result;
};
