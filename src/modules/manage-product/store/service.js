import Service from 'core/service';

class ManageProductService extends Service {
  listProductNoActive(params) {
    return this.get('api/products/products-no-active', params);
  }

  updateActive(params) {
    return this.put(
      'api/products/update-active?isActive=' +
        params.isActive +
        '&productId=' +
        params.productId
    );
  }
}

export default ManageProductService;
