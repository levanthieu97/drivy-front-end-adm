import Service from 'core/service';
import {} from 'core/constants';

class AllProducts extends Service {
  searchProducts(params) {
    return this.get('api/products/all?name=' + params.name);
  }

  optionSettingDetail(params) {
    return this.get('api/all/setting-detail', params);
  }

  requestProductDetail(params) {
    return this.get(
      'api/products/product-detail?cateDetailsType=' + params.cateDetailsType
    );
  }

  showProductDetail(params) {
    return this.get(
      'api/products/show-product-detail?productId=' + params.productId
    );
  }

  getListCatalog(params) {
    return this.get('api/catalog-product/' + params.productName);
  }

  checkExist(params) {
    return this.post('api/products/exist-product', params.supplierProduct);
  }

  addProductDetail(params) {
    return this.post(
      'api/products/add-product-supplier',
      params.supplierProduct
    );
  }
}

export default AllProducts;
