import Service from 'core/service';

class RegisterService extends Service {
  registerUser(params) {
    return this.post('/register', params);
  }
}

export default RegisterService;
