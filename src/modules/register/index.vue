<template>
  <v-app id="register" class="dark">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title class="subheading"
                >Đăng ký bán hàng cùng TP Shop</v-toolbar-title
                >
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    ref="username"
                    v-model="user.username"
                    :rules="usernameRules"
                    prepend-icon="account_circle"
                    label="Tài khoản"
                    required
                    autofocus
                    v-on:keyup.13="subRegister"
                  />
                  <v-text-field
                    ref="password"
                    v-model="user.password"
                    :rules="passwordRules"
                    type="password"
                    label="Mật khẩu"
                    prepend-icon="lock"
                    required
                    v-on:keyup.13="subRegister"
                  />
                  <v-text-field
                    ref="confirmpassword"
                    v-model="user.confirmpassword"
                    :rules="confirmpasswordRules"
                    type="password"
                    label="Xác nhận mật khẩu"
                    prepend-icon="lock"
                    required
                    v-on:keyup.13="subRegister"
                  />
                  <v-text-field
                    ref="fullname"
                    v-model="user.fullname"
                    :rules="fullnameRules"
                    prepend-icon="face"
                    label="Họ và tên chủ cửa hàng"
                    required
                    v-on:keyup.13="subRegister"
                  />
                  <v-text-field
                    ref="email"
                    v-model="user.email"
                    :rules="emailRules"
                    type="email"
                    prepend-icon="email"
                    label="Email"
                    required
                    v-on:keyup.13="subRegister"
                  />
                  <v-text-field
                    ref="address"
                    v-model="user.address"
                    :rules="addressRules"
                    prepend-icon="store"
                    label="Địa chỉ cửa hàng"
                    required
                    v-on:keyup.13="subRegister"
                  />
                  <v-text-field
                    ref="phone"
                    v-model="user.phone"
                    :rules="phoneRules"
                    prepend-icon="settings_phone"
                    label="Số điện thoại"
                    type="tel"
                    pattern="[0][1-9][0-9]{8}"
                    required
                    v-on:keyup.13="subRegister"
                  />
                  <v-layout row wrap>
                    <v-btn
                      color="primary"
                      block
                      primary
                      style="margin-right: 10px"
                      to="/login"
                    >Quay lại</v-btn
                    >
                    <v-btn color="primary" primary block @click="subRegister"
                    >Đăng ký</v-btn
                    >
                  </v-layout>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    user: {
      username: '',
      password: '',
      fullname: '',
      email: '',
      address: '',
      phone: '',
      role: 'supplier'
    },
    loading: false,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [v => !!v || 'Vui lòng nhập mật khẩu'],
    fullnameRules: [v => !!v || 'Vui lòng nhập họ và tên chủ cửa hàng'],
    usernameRules: [v => !!v || 'Vui lòng nhập tài khoản cửa hàng'],
    confirmpasswordRules: [v => !!v || 'Vui lòng xác nhận mật khẩu'],
    addressRules: [v => !!v || 'Vui lòng nhập địa chỉ cửa hàng'],
    phoneRules: [v => !!v || 'Vui lòng nhập số điện thoại']
  }),
  computed: {
    ...mapGetters('register', ['success', 'signal'])
  },

  watch: {
    signal() {
      if (this.success) {
        this.showSuccessMsg('Đăng ký thành công !!!');
      } else {
        this.showErrorMsg('Tài khoản đã tồn tại !!!');
      }
    }
  },

  mounted() {},

  methods: {
    ...mapActions('register', ['registerUser']),
    ...mapActions('global', ['showErrorMsg', 'showSuccessMsg']),

    subRegister() {
      if (!this.user.username) {
        this.$refs.username.focus();
      } else if (!this.user.password) {
        this.$refs.password.focus();
      } else if (!this.user.confirmpassword) {
        this.$refs.confirmpassword.focus();
      } else if (!this.user.fullname) {
        this.$refs.fullname.focus();
      } else if (!this.validateEmail(this.user.email)) {
        this.$refs.email.focus();
      } else if (!this.user.address) {
        this.$refs.address.focus();
      } else if (!this.user.phone) {
        this.$refs.phone.focus();
      } else if (this.user.password != this.user.confirmpassword) {
        this.showErrorMsg('Xác nhận mật khẩu không đúng !');
      } else {
        this.registerUser({
          username: this.user.username,
          password: this.user.password,
          fullname: this.user.fullname,
          email: this.user.email,
          address: this.user.address,
          phone: this.user.phone,
          role: this.user.role
        });
      }
    },

    validateEmail(email) {
      let re = /.+@.+/;
      return re.test(String(email).toLowerCase());
    }
  }
};
</script>

<style scoped></style>
