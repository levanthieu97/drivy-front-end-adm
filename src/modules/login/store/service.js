import Service from 'core/service';

class LoginService extends Service {
  async login(params) {
    return await this.post('/sign-in', params);
  }

  async createSupplier(params) {
    return await this.post(
      '/api/suppliers/createSupplier?userId=' + params.userId,
      params.supplier
    );
  }

  async getSupplier(params) {
    return await this.get('/api/suppliers/' + params.id);
  }

  async confirmEmail(params) {
    return await this.post('/api/mail/confirm-register', params.mailUser);
  }
}
export default LoginService;
