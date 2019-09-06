import Service from 'core/service';
class dashboardService extends Service {
  countProduct(params) {
    return this.get(
      'api/suppliers/count-product?supplierProfileId=' +
        params.supplierProfileId
    );
  }

  countPayment(params) {
    return this.get(
      'api/payment/count-payment?supplierProfileId=' + params.supplierProfileId
    );
  }
}

export default dashboardService;
