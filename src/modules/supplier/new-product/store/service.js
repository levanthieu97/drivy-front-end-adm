import Service from 'core/service';
import {} from 'core/constants';

class CreateProduct extends Service {
  requestCategory(params) {
    return this.get('api/category/all', params);
  }

  requestInfoProduct(params) {
    return this.post('api/products/new-product', params.product);
  }

  requestNameCatalog(params) {
    return this.get('api/category-catalog/get-catalog/' + params.detailType);
  }

  requestProductCatalog(params) {
    return this.post('api/products/product-catalog', params.productCatalog);
  }

  requestColor(params) {
    return this.get('api/products/color', params);
  }

  requestSize(params) {
    return this.get('api/products/size', params);
  }

  compareProduct(params) {
    return this.get(
      'api/products/compare-name-product?productNameCompare=' +
        params.productNameCompare
    );
  }
}

export default CreateProduct;
