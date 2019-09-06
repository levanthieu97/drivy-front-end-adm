import Service from 'core/service';
import {} from 'core/constants';

class supplierOrders extends Service {
  getNameCategory(params) {
    return this.get('api/supplier/category', params);
  }

  getListProduct(params) {
    return this.get(
      'api/supplier-order/supplier?supplierProfileId=' +
        params.supplierProfileId
    );
  }

  getListProductOrder(params) {
    return this.get(
      'api/supplier-order/product?paymentId=' +
        params.paymentId +
        '&supplierProfileId=' +
        params.supplierProfileId
    );
  }

  getListProductDetailOrder(params) {
    return this.get(
      'api/supplier-order/product-detail?paymentId=' +
        params.paymentId +
        '&supplierProfileId=' +
        params.supplierProfileId
    );
  }

  updateStatus(params) {
    return this.put(
      'api/payment/status?status=' +
        params.status +
        '&paymentId=' +
        params.paymentId
    );
  }
}

export default supplierOrders;
