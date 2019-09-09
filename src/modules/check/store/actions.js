import CheckService from './service';

const service = new CheckService();

export const getInfoProductByProductName = async (dispatch, param) => {
  const result = await service.getInfoProductByName(param);
  return result;
};

export const listImage = async (dispatch, param) => {
  const result = await service.getProductImage(param);
  return result;
};
