<template>
  <v-dialog v-model="dialog" persistent width="50%">
    <v-form ref="form" v-model="valid" class="max_content">
      <v-card class="home-app-wrapper">
        <v-layout align-center fill-height class="header white--text ui_title">
          <v-flex md8 xs8>
            <v-card-title class="subheading white--text title"
            >Xác nhận kinh doanh với TP Shop</v-card-title
            >
          </v-flex>
          <v-flex md4 xs4>
            <v-layout row align-center justify-end fill-height>
              <v-btn outline color="white" @click="send">Gửi</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-card-text class="body overflow_hidden no_padding">
          <v-card class="no_shaddow">
            <v-container grid-list-md>
              <v-flex xs12>
                <v-text-field
                  ref="storename"
                  v-model="supplier.store_name"
                  :rules="storenameRules"
                  prepend-icon="store"
                  label="Tên cửa hàng"
                  required
                  autofocus
                  v-on:keyup.13="send"
                />
                <v-text-field
                  ref="businesscode"
                  v-model="supplier.business_code"
                  :rules="businesscodeRules"
                  prepend-icon="code"
                  label="Mã số kinh doanh"
                  required
                  v-on:keyup.13="send"
                />
                <v-text-field
                  ref="taxcode"
                  v-model="supplier.tax_code"
                  :rules="taxcodeRules"
                  label="Mã số thuế"
                  prepend-icon="attach_money"
                  required
                  v-on:keyup.13="send"
                />
                <v-layout row wrap>
                  <v-flex xs4>
                    <v-subheader
                    >Bạn đã có giấy phép kinh doanh chưa:</v-subheader
                    >
                  </v-flex>
                  <v-flex xs8>
                    <v-radio-group
                      v-model="supplier.is_license"
                      row
                      style="padding-top: 0px; margin-top: 10px"
                    >
                      <v-radio label="Có" value="1"></v-radio>
                      <v-radio label="Chưa có" value="0"></v-radio>
                    </v-radio-group>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-container>
          </v-card>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      supplier: {
        store_name: '',
        business_code: '',
        tax_code: '',
        is_license: '',
        supplier_profile_id: ''
      },
      mailUser: {
        user_name: '',
        user_address: '',
        store_name: ''
      },
      valid: true,

      dialog: false,
      storenameRules: [v => !!v || 'Vui lòng nhập tên cửa hàng'],
      businesscodeRules: [v => !!v || 'Vui lòng nhập mã kinh doanh'],
      taxcodeRules: [v => !!v || 'Vui lòng nhập mã số kinh doanh']
    };
  },

  watch: {
    show(value) {
      this.dialog = value;
    },

    dialog() {
      if (!this.dialog) {
        this.emitCloseState();
      }
    }
  },

  computed: {
    ...mapGetters('login', ['me'])
  },

  created() {
    this.isExist();
  },

  methods: {
    ...mapActions('login', [
      'getSupplier',
      'createSupplier',
      'confirmSupplier'
    ]),
    ...mapActions('global', ['setLoading']),

    async isExist() {
      let result = await this.getSupplier({
        id: this.me.user_id
      });
      if (result.success == true) {
        this.dialog = false;
      } else {
        this.dialog = true;
      }
    },

    async send() {
      if (!this.supplier.store_name) {
        this.$refs.storename.focus();
      } else if (!this.supplier.business_code) {
        this.$refs.businesscode.focus();
      } else if (!this.supplier.tax_code) {
        this.$refs.taxcode.focus();
      } else if (!this.supplier.is_license) {
        this.$refs.islicense.focus();
      } else {
        await this.createSupplier({
          userId: this.me.user_id,
          supplier: this.supplier
        });
        this.setLoading(true);
        this.dialog = false;
        this.$router.go(this.$router.currentRoute);
        this.mailUser.user_name = this.me.fullname;
        this.mailUser.user_address = this.me.email;
        this.mailUser.store_name = this.supplier.store_name;

        const { success, message } = await this.confirmSupplier({
          mailUser: this.mailUser
        });
        console.log(message);
      }
      this.setLoading(false);
    },

    emitCloseState() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.no_padding {
  padding: 0 !important;
}
</style>
