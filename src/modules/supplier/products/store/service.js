import Service from 'core/service';

class productService extends Service {
  listProductTable(params) {
    return this.get(
      'api/suppliers/product?supplierProfileId=' + params.supplierProfileId
    );
  }

  listProductDetailTable(params) {
    return this.get(
      'api/suppliers/product-detail-order?supplierProfileId=' +
        params.supplierProfileId
    );
  }

  listProductNoActive(params) {
    return this.get(
      'api/suppliers/product-no-active?supplierProfileId=' +
        params.supplierProfileId
    );
  }

  listProductDetailNoActive(params) {
    return this.get(
      'api/suppliers/product-detail-no-active?supplierProfileId=' +
        params.supplierProfileId
    );
  }

  updateQuantityProduct(params) {
    return this.put(
      'api/products/update-product-quantity?productQuantity=' +
        params.productQuantity +
        '&productId=' +
        params.productId
    );
  }

  updateQuantityProductDetail(params) {
    return this.put(
      'api/products/update-product-quantity-detail?quantity=' +
        params.quantity +
        '&productDetailId=' +
        params.productDetailId
    );
  }

  resetProduct(params) {
    return this.put(
      'api/products/reset-product-quantity?productId=' + params.productId
    );
  }

  resetProductDetail(params) {
    return this.put(
      'api/products/reset-product-quantity-detail?productDetailId=' +
        params.productDetailId
    );
  }
}

export default productService;
