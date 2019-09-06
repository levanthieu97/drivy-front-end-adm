<template>
  <v-dialog v-model="dialog" width="55%">
    <v-card>
      <v-toolbar dark color="pink" tabs>
        <v-toolbar-title class="font-weight-regular"
        >Tạo sản phẩm</v-toolbar-title
        >
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon dark @click="closePopup">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container grid-list-md class="pt-2">
        <v-layout wrap row>
          <v-flex v-if="list_product.length > 0" xs6 md5 lg5>
            <v-select
              v-model="chose_product"
              item-text="size"
              item-value="product_detail_id"
              :items="list_size"
              chips
            >
              <template slot="prepend">
                <v-chip
                  class="mr-0 subheading font-weight-regular"
                  style="background-color:white"
                >Chọn sản phẩm:</v-chip
                >
              </template>
            </v-select>
          </v-flex>
          <v-flex xs1 md1 lg1 />
          <v-flex v-if="role !== 'ROLE_ADMIN'" md6 lg6 class="pt-3">
            <v-btn outline color="pink" class="text-none" @click="buyProduct"
            >Bán sản phẩm</v-btn
            >
          </v-flex>
        </v-layout>

        <v-card>
          <v-layout wrap row class="mt-1">
            <v-flex xs12 md12>
              <v-tabs
                v-model="tabs"
                color="transparent"
                slider-color="primary"
                grow
                class
              >
                <v-tab key="0">Thông tin chung</v-tab>
                <v-tab key="1">Mô tả sản phẩm</v-tab>
                <v-tab key="2">Thông tin chi tiết</v-tab>
              </v-tabs>
            </v-flex>
          </v-layout>
          <v-layout wrap row>
            <v-flex xs12 md12>
              <v-tabs-items v-model="tabs">
                <v-tab-item key="0">
                  <div class="block">
                    <v-layout row wrap align-center justify-center>
                      <v-flex xs4 md4 lg4>
                        <v-img :src="product_now" alt="Image Products"></v-img>
                      </v-flex>
                      <v-flex xs8 md8 lg8>
                        <div
                          class="text-uppercase font-weight-medium blue--text"
                        >
                          {{ products.product_name }}
                        </div>
                        <ul>
                          <li>
                            <span>Mã sản phẩm:</span>
                            <span class="ml-1">{{
                              products.product_code
                            }}</span>
                          </li>
                          <li>
                            <span>Giá niêm yết:</span>
                            <span class="ml-1">
                              {{ formatPrice(products.price) }}
                              <ins>đ</ins>
                            </span>
                          </li>
                          <li>
                            <span>Giá bán:</span>
                            <span class="ml-1">
                              {{ formatPrice(products.alter_price) }}
                              <ins>đ</ins>
                            </span>
                          </li>
                        </ul>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-tab-item>
                <v-tab-item key="1">
                  <div class="block">
                    <v-layout row wrap class="mx-4">
                      <v-flex xs12 md12>
                        <ul style="list-style-type:none" class="pl-0">
                          <li v-for="i in description" :key="i">
                            <p class="mb-1">{{ i }}</p>
                          </li>
                        </ul>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-tab-item>
                <v-tab-item key="2">
                  <v-layout row wrap>
                    <v-flex xs1 md1 lg1 />
                    <v-flex xs10 md10>
                      <table class="attribute">
                        <tr v-for="(item, i) in catalogAttribute" :key="i">
                          <td class="td_left">{{ item.type }}</td>
                          <td>{{ item.catalog }}</td>
                        </tr>
                      </table>
                    </v-flex>
                    <v-flex xs1 md1 lg1 />
                  </v-layout>
                </v-tab-item>
              </v-tabs-items>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<style scoped>
.td_left {
  background-color: #cfd8dc;
  width: 30%;
}

.attribute {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.attribute td,
th {
  border: 1px solid #000000;
  text-align: left;
  padding: 8px;
}
</style>
<script>
import { TABLE_PAGE_LENGTH } from 'core/constants';
import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash';
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    parameter: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialog: false,
      chose_product: '',
      list_size: [],
      list_product: [],
      tabs: null,
      product_now: '',
      products: {},
      description: [],
      catalogs: '',
      brand: '',
      catalogAttribute: []
    };
  },
  created() {},

  computed: {
    ...mapGetters('login', ['me', 'theSupplier', 'role'])
  },

  watch: {
    show(value) {
      this.dialog = value;
      if (this.dialog) {
        this.loadPopup();
      }
    },

    dialog() {
      if (!this.dialog) {
        this.list_product = [];
        this.emitCloseState();
      }
    }
  },

  methods: {
    ...mapActions('AllProducts', [
      'showProductDetails',
      'listCatalog',
      'checkExistProduct',
      'addProductForSupplier'
    ]),

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    async buyProduct() {
      console.log(this.chose_product);
      let supplierProduct = {
        product_id: this.parameter.data.product_id,
        supplier_profile_id: this.theSupplier,
        product_detail_id: this.chose_product.product_detail_id
      };

      const { data, success, message } = await this.checkExistProduct({
        supplierProduct: supplierProduct
      });
      if (success === false) {
        const result = await this.addProductForSupplier({
          supplierProduct: supplierProduct
        });
        this.$message.success('Đăng bán sản phẩm thành công !!!');
        this.dialog = false;
      } else {
        this.$message.warning('Sản phẩm này đã được đăng bán !!!');
      }
    },

    closePopup() {
      this.dialog = false;
    },

    emitCloseState() {
      this.$emit('close');

      //emit khi báo event cho component khai báo để xử lý
      //listeners lắng nghe sự kiện trong component
    },

    async loadPopup() {
      console.log(this.parameter.data);
      this.products = this.parameter.data;
      const { data, success, message } = await this.showProductDetails({
        productId: this.parameter.data.product_id
      });
      if (data.length > 0) {
        this.list_product = data;
        _.forEach(this.list_product, item => {
          let product = {
            product_detail_id: item.product_detail_id,
            size: 'Size: ' + item.size_name + ' - Màu: ' + item.color_name
          };
          this.list_size.push(product);
        });
        this.chose_product = this.list_size[0];
      }
      const result = await this.listCatalog({
        productName: this.parameter.data.product_name
      });
      console.log(result);
      this.catalogs = result.data.catalog_types;
      _.forEach(this.catalogs, catalog => {
        if (catalog.catalog_type_id === 11) {
          this.brand = catalog.catalog_name;
        }
      });
      let attribute = [];
      _.forEach(this.catalogs, catalog => {
        let result = {
          type: '',
          catalog: ''
        };
        result.type = catalog.type_name;
        result.catalog = catalog.catalog_name;
        attribute.push(result);
      });
      this.catalogAttribute = attribute;
      this.product_now = this.parameter.data.product_image;
      this.description = this.products.product_description.split('\n');
    }
  }
};
</script>
