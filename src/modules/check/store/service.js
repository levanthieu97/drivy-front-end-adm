import Service from 'core/service';

class CheckService extends Service {
  getInfoProductByName(params) {
    return this.get('api/products/information-product/' + params.productName);
  }

  getProductImage(params) {
    return this.get('api/image/product/' + params.productName);
  }
}

export default CheckService;
