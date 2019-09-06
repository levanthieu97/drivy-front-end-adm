<template>
  <v-container grid-list-md>
    <v-card class="pa-3">
      <v-container grid-list-xl pa-0>
        <v-layout wrap row>
          <v-flex xs4 md2 sm2 fixed>
            <img id="store" src="~assets/images/store.png" />
          </v-flex>
          <v-flex xs7 md4 sm5 offset-md1>
            <v-list class="transparent">
              <v-list-tile>
                <v-icon color="blue" class="tile-icon" dark>store</v-icon>
                <v-list-tile-title class="tile-title"
                >Mã gian hàng:</v-list-tile-title
                >
                <v-list-tile-sub-title
                >S0{{ supplier.profile_id }}</v-list-tile-sub-title
                >
              </v-list-tile>
              <v-list-tile>
                <v-icon color="blue" class="tile-icon" dark
                >local_grocery_store</v-icon
                >
                <v-list-tile-title class="tile-title"
                >Tên gian hàng:</v-list-tile-title
                >
                <v-list-tile-sub-title>{{
                  supplier.store_name
                }}</v-list-tile-sub-title>
              </v-list-tile>
              <v-list-tile>
                <v-icon color="blue" class="tile-icon" dark>local_atm</v-icon>
                <v-list-tile-title class="tile-title"
                >Mã số thuế:</v-list-tile-title
                >
                <v-list-tile-sub-title>{{
                  supplier.tax_code
                }}</v-list-tile-sub-title>
              </v-list-tile>
            </v-list>
          </v-flex>
          <v-flex xs12 md4 sm5>
            <v-list class="transparent">
              <v-list-tile>
                <v-icon color="blue" class="tile-icon" dark>face</v-icon>
                <v-list-tile-title class="tile-title"
                >Tên chủ cửa hàng:</v-list-tile-title
                >
                <v-list-tile-sub-title>{{ me.fullname }}</v-list-tile-sub-title>
              </v-list-tile>
              <v-list-tile>
                <v-icon color="blue" class="tile-icon" dark
                >mail_outline</v-icon
                >
                <v-list-tile-title class="tile-title">Email:</v-list-tile-title>
                <v-list-tile-sub-title>{{ me.email }}</v-list-tile-sub-title>
              </v-list-tile>
              <v-list-tile>
                <v-icon color="blue" class="tile-icon" dark>local_phone</v-icon>
                <v-list-tile-title class="tile-title"
                >Số điện thoại:</v-list-tile-title
                >
                <v-list-tile-sub-title>{{ me.phone }}</v-list-tile-sub-title>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container grid-list-xl fluid pa-0>
        <v-layout row wrap>
          <v-flex d-flex sm4 md4 xs12>
            <v-card color="light-blue lighten-4">
              <v-card-title primary class="title font-weight-regular"
              >Sản phẩm đang bán</v-card-title
              >
              <v-card-text class="pt-1">
                <div class="mt-0">
                  <span class="display-2">{{ product_quantity }}</span>
                </div>
              </v-card-text>
              <v-layout wrap row>
                <v-flex xs1 md1 />
                <v-flex md10 xs10>
                  <v-btn
                    depressed
                    small
                    block
                    class="text-none"
                    @click="createProduct"
                  >
                    <span>
                      <v-icon>add_to_queue</v-icon>
                    </span>
                    <span class="ml-2 font-weight-light"
                    >Tạo mới / đăng sản phẩm</span
                    >
                  </v-btn>
                  <v-btn
                    depressed
                    small
                    block
                    class="text-none"
                    @click="listProduct"
                  >
                    <span>
                      <v-icon>sports_basketball</v-icon>
                    </span>
                    <span class="ml-2 font-weight-light"
                    >Danh sách sản phẩm</span
                    >
                  </v-btn>
                </v-flex>
                <v-flex xs1 md1 />
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex d-flex sm4 md4 xs12>
            <v-card color="light-blue lighten-4">
              <v-card-title primary class="title font-weight-regular"
              >Đơn hàng đang xử lý</v-card-title
              >
              <v-card-text class="pt-1">
                <div class="mt-0">
                  <span class="display-2">{{ payment_quantity }}</span>
                </div>
              </v-card-text>
              <v-layout wrap row>
                <v-flex xs1 md1 />
                <v-flex md10 xs10>
                  <v-btn
                    depressed
                    small
                    block
                    class="text-none"
                    @click="listPayment"
                  >
                    <span>
                      <v-icon>add_shopping_cart</v-icon>
                    </span>
                    <span class="ml-2 font-weight-light"
                    >Xác nhận đơn hàng</span
                    >
                  </v-btn>
                </v-flex>
                <v-flex xs1 md1 />
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex d-flex sm4 md4 xs12>
            <v-card color="light-blue lighten-4" style="height:100%;width:100%">
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>
<style lang="scss" scoped>
.tile-icon {
  margin-right: 10px;
}
.tile-title {
  font-weight: bold;
}
</style>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      supplier: {
        profile_id: '',
        store_name: '',
        tax_code: ''
      },
      product_quantity: '',
      payment_quantity: ''
    };
  },

  computed: {
    ...mapGetters('login', ['me', 'theSupplier'])
  },

  created() {
    this.getStore();
    this.countProduct();
    this.countPayment();
  },

  methods: {
    ...mapActions('login', ['getSupplier']),
    ...mapActions('dashboard', ['quantityProduct', 'quantityPayment']),

    createProduct() {
      this.$router.push({ path: 'pd/request-products' });
    },

    listProduct() {
      this.$router.push({ path: 'pd/products' });
    },

    listPayment() {
      this.$router.push({ path: 'od/orders' });
    },

    async countProduct() {
      const { data, success, message } = await this.quantityProduct({
        supplierProfileId: this.theSupplier
      });
      this.product_quantity = data;
    },

    async countPayment() {
      const result = await this.quantityPayment({
        supplierProfileId: this.theSupplier
      });
      this.payment_quantity = result.data;
    },

    async getStore() {
      const {
        data = '',
        success = null,
        message = ''
      } = await this.getSupplier({
        id: this.me.user_id
      });
      if (data !== null) {
        this.supplier.profile_id = data.supplier_profile_id;
        this.supplier.store_name = data.store_name;
        this.supplier.tax_code = data.tax_code;
      }
    }
  }
};
</script>
<style scoped></style>
