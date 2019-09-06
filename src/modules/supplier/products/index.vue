<template>
  <v-container fluid grid-list-md>
    <v-layout wrap row>
      <v-flex xs12 md12 lg12>
        <!-- <v-card>
        <v-card-text>-->
        <v-layout wrap row>
          <v-flex xs12 md12>
            <v-tabs
              v-model="tabs"
              color="transparent"
              slider-color="primary"
              class
            >
              <v-tab key="1" active-class="v-tabs__item--active active-tabs"
              >Đăng bán</v-tab
              >
              <v-tab key="2" active-class="v-tabs__item--active active-tabs"
              >Đề nghị duyệt</v-tab
              >
              <v-btn color="pink" class="text-none" outline @click="addProduct"
              >Tạo sản phẩm</v-btn
              >
            </v-tabs>
          </v-flex>
        </v-layout>
        <v-layout wrap row>
          <v-flex xs12 md12>
            <v-tabs-items v-model="tabs">
              <v-tab-item key="1">
                <div class="block">
                  <v-card class="decorate_area no_box_shadow">
                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex md6>
                          <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Sản phẩm"
                          ></v-text-field>
                        </v-flex>
                        <!-- <v-flex md2>
                          <v-btn round color="#3949AB" dark class="font-weight-regular" @click="btnSearch">
                            <span class="text-none">Tìm kiếm</span>
                          </v-btn>
                        </v-flex>-->
                        <v-flex md12>
                          <v-data-table
                            :headers="headers"
                            :items="items"
                            :rows-per-page-items="page_size"
                            :search="search"
                            class="elevation-1"
                            :rows-per-page-text="row_page"
                          >
                            <template slot="items" slot-scope="props">
                              <tr>
                                <td class="text-xs-center">
                                  {{ props.item.no }}
                                </td>
                                <td class="text-xs-center">
                                  <v-img
                                    :src="props.item.image_product"
                                    aspect-ratio="1"
                                    width="90px"
                                  ></v-img>
                                </td>
                                <td v-if="props.item.product_detail_id !== ''">
                                  <div>
                                    <span>{{ props.item.product_name }}</span>
                                    <span>
                                      (size: {{ props.item.size_name }} - màu:
                                      {{ props.item.color_name }})
                                    </span>
                                  </div>
                                  <div>
                                    <span>SKU: {{ props.item.sku }}</span>
                                  </div>
                                </td>
                                <td v-else>
                                  <div>{{ props.item.product_name }}</div>
                                  <div>
                                    <span>SKU: {{ props.item.sku }}</span>
                                  </div>
                                </td>
                                <td class="text-xs-center">
                                  {{ props.item.product_quantity }}
                                </td>
                                <td class="text-xs-center">
                                  {{ formatPrice(props.item.alter_price) }}
                                  <ins class="ml-1">đ</ins>
                                </td>
                                <td
                                  v-if="props.item.product_quantity > 0"
                                  class="text-xs-center"
                                >
                                  Còn hàng
                                </td>
                                <td
                                  v-if="props.item.product_quantity === 0"
                                  class="red--text text-xs-center"
                                >
                                  Hết hàng
                                </td>
                                <td
                                  class="justify-center layout text-xs-center px-0"
                                >
                                  <v-icon
                                    class="mr-2 mt-5"
                                    @click="editProducts(props.item)"
                                  >edit</v-icon
                                  >
                                  <v-icon
                                    class="mr-2 mt-5"
                                    @click="changeUsed(props.item)"
                                  >
                                    {{
                                      props.item.product_quantity > 0
                                        ? 'close'
                                        : 'check'
                                    }}
                                  </v-icon>
                                </td>
                              </tr>
                            </template>
                          </v-data-table>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </div>
              </v-tab-item>
              <v-tab-item key="2">
                <div class="block">
                  <v-card class="decorate_area no_box_shadow">
                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex md6>
                          <v-text-field
                            v-model="search_no_active"
                            append-icon="search"
                            label="Sản phẩm"
                          ></v-text-field>
                        </v-flex>
                        <!-- <v-flex md2>
                          <v-btn round color="#3949AB" dark class="font-weight-regular" @click="btnSearch">
                            <span class="text-none">Tìm kiếm</span>
                          </v-btn>
                        </v-flex>-->
                        <v-flex md12>
                          <v-data-table
                            :headers="headers_no_active"
                            :items="items_no_active"
                            :rows-per-page-items="page_size"
                            :search="search_no_active"
                            class="elevation-1"
                            :rows-per-page-text="row_page"
                          >
                            <template slot="items" slot-scope="props">
                              <tr>
                                <td class="text-xs-center">
                                  {{ props.item.no_no_active }}
                                </td>
                                <td class="text-xs-center">
                                  <v-img
                                    :src="props.item.image_product_no_active"
                                    aspect-ratio="1"
                                    width="90px"
                                  ></v-img>
                                </td>
                                <td
                                  v-if="
                                    props.item.product_detail_id_no_active !==
                                      ''
                                  "
                                >
                                  <div>
                                    <span>{{
                                      props.item.product_name_no_active
                                    }}</span>
                                    <span>
                                      (size:
                                      {{ props.item.size_name_no_active }} -
                                      màu:
                                      {{ props.item.color_name_no_active }})
                                    </span>
                                  </div>
                                  <div>
                                    <span
                                    >SKU: {{ props.item.sku_no_active }}</span
                                    >
                                  </div>
                                </td>
                                <td v-else>
                                  <div>
                                    {{ props.item.product_name_no_active }}
                                  </div>
                                  <div>
                                    <span
                                    >SKU: {{ props.item.sku_no_active }}</span
                                    >
                                  </div>
                                </td>
                                <td class="text-xs-center">
                                  {{ props.item.product_quantity_no_active }}
                                </td>
                                <td class="text-xs-center">
                                  {{
                                    formatPrice(
                                      props.item.alter_price_no_active
                                    )
                                  }}
                                  <ins class="ml-1">đ</ins>
                                </td>
                                <td
                                  v-if="
                                    props.item.product_quantity_no_active > 0
                                  "
                                  class="text-xs-center"
                                >
                                  Chờ Duyệt
                                </td>
                                <td
                                  v-if="props.item.is_active < 0"
                                  class="red--text text-xs-center"
                                >
                                  Bị Từ Chối
                                </td>
                              </tr>
                            </template>
                          </v-data-table>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-flex>
        </v-layout>
        <!-- </v-card-text>
        </v-card>-->
      </v-flex>
    </v-layout>
    <dialog-confirm
      :show="showPopupRemove"
      :parameter="parameterPopup"
      @close="handleClosePopupRemove"
    />
    <update-quantity
      :show="showPopupUpdateQuantity"
      :parameter="parameterQuantity"
      @close="handleClosePopupUpdate"
      @submit="handleUpdateQuantity"
    />
  </v-container>
</template>

<style lang="scss">
.v-input--selection-controls {
  padding-top: 0px;
  margin-bottom: 0px !important;
  margin-top: 0px;
}

.v-text-field {
  padding-top: 0px;
  margin-top: 0px;
}

.v-chip-style {
  width: 160px;
}

.v-input__prepend-outer {
  margin-right: 0px;
}
// .v-input__slot {
//   margin-top: 5px;
// }
.v-input__control {
  min-height: 43px !important;
}

// .full_text_table {
//   white-space: nowrap;
// }

.text_left {
  text-align: left !important;
}

.text_center {
  text-align: center !important;
}

.text_right {
  text-align: right !important;
}

.layout_row_expand_detail {
  height: 50px !important;
}

.layout_row {
  height: 40px !important;
}

.span-hover:hover {
  color: blue;
}

.layout_row_expand {
  height: 5px !important;
}

.v-tabs__div {
  text-transform: none;
}

.layout_row_table {
  height: 15px !important;
}

.block {
  padding-bottom: 10px !important;
}

.active-tabs {
  background-color: white;
}
</style>

<script>
import { TABLE_PAGE_SIZES } from 'core/constants';
import { mapActions, mapGetters } from 'vuex';
import dialogConfirm from 'modules/common/dialog-confirm';
import updateQuantity from './update-quantity';
import _ from 'lodash';
export default {
  components: {
    dialogConfirm,
    updateQuantity
  },

  data() {
    return {
      tabs: null,
      search: '',
      search_no_active: '',
      items_no_active: [],
      products: [],
      products_no_active: [],
      product_detail: [],
      product_detail_no_active: [],
      list_product: [],
      list_product_no_active: [],
      this_product: {},
      product_id: '',
      showPopupRemove: false,
      showPopupUpdateQuantity: false,
      parameterPopup: {
        title: '',
        nameBnt: '',
        iconName: '',
        mode: '',
        data: {}
      },
      parameterQuantity: {
        data: {}
      },
      row_page: 'Số sản phẩm:',
      headers: [
        {
          text: 'No',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Hình ảnh',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Tên sản phẩm',
          sortable: false,
          align: 'left',
          value: 'product_name'
        },
        {
          text: 'Số lượng',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Giá bán',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Trạng thái',
          sortable: false,
          align: 'center'
        },
        {
          text: '',
          sortable: false,
          align: 'center'
        }
      ],
      headers_no_active: [
        {
          text: 'No',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Hình ảnh',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Tên sản phẩm',
          sortable: false,
          align: 'left',
          value: 'product_name_no_active'
        },
        {
          text: 'Số lượng',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Giá bán',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Trạng thái',
          sortable: false,
          align: 'center'
        }
      ],
      items: [],
      page_size: TABLE_PAGE_SIZES
    };
  },

  watch: {
    items: {
      handler() {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].no = i + 1;
        }
      }
    },

    items_no_active: {
      handler() {
        for (var i = 0; i < this.items_no_active.length; i++) {
          this.items_no_active[i].no_no_active = i + 1;
        }
      }
    }
  },

  created() {
    console.log(this.theSupplier);
    console.log(this.me);
    this.loadData();
    this.loadDataNoActive();
  },

  computed: {
    ...mapGetters('login', ['role', 'theSupplier', 'me'])
  },
  methods: {
    ...mapActions('Products', [
      'searchProductTable',
      'searchProductDetailTable',
      'resetPoductQuantity',
      'resetProductDetailQuantity',
      'searchProductNoActive',
      'searchProductDetailNoActive'
    ]),

    btnSeach() {},

    changeUsed(item) {
      console.log(item);
      this.this_product = item;
      this.product_id = item.no;
      this.parameterPopup.title = 'Thông Báo';
      this.parameterPopup.message = 'Bạn muốn ngưng hoạt động sản phẩm này?';
      if (item.product_quantity > 0) {
        this.showPopupRemove = true;
      }
    },
    handleUpdateQuantity(flag) {
      console.log(flag);
      _.forEach(this.items, item => {
        if (item.no === this.product_id) {
          item.product_quantity = flag;
        }
      });
      this.showPopupUpdateQuantity = false;
    },

    async handleClosePopupRemove(flag) {
      if (flag) {
        console.log('dsadsa');
        _.forEach(this.items, item => {
          if (item.no === this.product_id) {
            item.product_quantity = 0;
          }
        });
        if (this.this_product.product_detail_id === '') {
          const update_product = await this.resetPoductQuantity({
            productId: this.this_product.product_id
          });
        } else {
          const update_product = await this.resetProductDetailQuantity({
            productDetailId: this.this_product.product_detail_id
          });
        }
      }
      this.showPopupRemove = false;
    },

    handleClosePopupUpdate() {
      this.showPopupUpdateQuantity = false;
    },

    editProducts(item) {
      this.product_id = item.no;
      this.parameterQuantity.data = item;
      this.showPopupUpdateQuantity = true;
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    async loadData() {
      const data_product = await this.searchProductTable({
        supplierProfileId: this.theSupplier
      });
      if (data_product.data != null) {
        if (data_product.data.products.length > 0) {
          this.products = data_product.data.products;
          _.forEach(this.products, item => {
            let product = {
              product_id: item.product_id,
              sku: item.product_code,
              product_name: item.product_name,
              product_quantity: item.product_quantity,
              alter_price: item.alter_price,
              product_detail_id: ''
            };
            let temp = item.product_image;
            let image_product = '';
            if (temp !== '') {
              let raw = window.atob(temp);
              let rawLength = raw.length;
              let array = new Uint8Array(new ArrayBuffer(rawLength));

              for (let i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
              }
              // Make a Blob from the bytes
              let blob = new Blob([array], { type: 'image/png' });
              // Use createObjectURL to make a URL for the blob
              let image = new Image();
              image.src = URL.createObjectURL(blob);
              image_product = image.src;
            } else {
              image_product = '';
            }
            product.image_product = image_product;
            this.list_product.push(product);
          });
        }
      }
      const data_product_detail = await this.searchProductDetailTable({
        supplierProfileId: this.theSupplier
      });

      if (data_product_detail.data != null) {
        if (data_product_detail.data.product_order_details.length > 0) {
          this.product_detail = data_product_detail.data.product_order_details;
          _.forEach(this.product_detail, item => {
            let product = {
              product_id: item.product_id,
              sku: item.sku,
              product_name: item.product_name,
              product_quantity: item.quantity,
              alter_price: item.pd_price,
              product_detail_id: item.product_detail_id,
              color_name: item.color_name,
              size_name: item.size_name
            };
            let temp = item.pd_image;
            let image_product = '';
            if (temp !== '') {
              let raw = window.atob(temp);
              let rawLength = raw.length;
              let array = new Uint8Array(new ArrayBuffer(rawLength));

              for (let i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
              }
              // Make a Blob from the bytes
              let blob = new Blob([array], { type: 'image/png' });
              // Use createObjectURL to make a URL for the blob
              let image = new Image();
              image.src = URL.createObjectURL(blob);
              image_product = image.src;
            } else {
              image_product = '';
            }
            product.image_product = image_product;
            this.list_product.push(product);
          });
        }
      }
      console.log(data_product_detail.data);

      if (this.list_product.length > 0) {
        this.items = this.list_product;
      }
    },

    async loadDataNoActive() {
      const data_product = await this.searchProductNoActive({
        supplierProfileId: this.theSupplier
      });
      console.log(data_product);
      if (data_product.data != null) {
        if (data_product.data.products.length > 0) {
          this.products_no_active = data_product.data.products;
          _.forEach(this.products_no_active, item => {
            let product = {
              product_id_no_active: item.product_id,
              sku_no_active: item.product_code,
              product_name_no_active: item.product_name,
              product_quantity_no_active: item.product_quantity,
              alter_price_no_active: item.alter_price,
              product_detail_id_no_active: '',
              is_active: item.is_active
            };
            let temp = item.product_image;
            let image_product = '';
            if (temp !== '') {
              let raw = window.atob(temp);
              let rawLength = raw.length;
              let array = new Uint8Array(new ArrayBuffer(rawLength));

              for (let i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
              }
              // Make a Blob from the bytes
              let blob = new Blob([array], { type: 'image/png' });
              // Use createObjectURL to make a URL for the blob
              let image = new Image();
              image.src = URL.createObjectURL(blob);
              image_product = image.src;
            } else {
              image_product = '';
            }
            product.image_product_no_active = image_product;
            this.list_product_no_active.push(product);
          });
        }
      }
      const data_product_detail = await this.searchProductDetailNoActive({
        supplierProfileId: this.theSupplier
      });

      if (data_product_detail.data != null) {
        if (data_product_detail.data.product_order_details.length > 0) {
          this.product_detail_no_active =
            data_product_detail.data.product_order_details;
          _.forEach(this.product_detail_no_active, item => {
            let product = {
              product_id_no_active: item.product_id,
              sku_no_active: item.sku,
              product_name_no_active: item.product_name,
              product_quantity_no_active: item.quantity,
              alter_price_no_active: item.pd_price,
              product_detail_id_no_active: item.product_detail_id,
              color_name_no_active: item.color_name,
              size_name_no_active: item.size_name,
              is_active: item.is_active
            };
            let temp = item.pd_image;
            let image_product = '';
            if (temp !== '') {
              let raw = window.atob(temp);
              let rawLength = raw.length;
              let array = new Uint8Array(new ArrayBuffer(rawLength));

              for (let i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
              }
              // Make a Blob from the bytes
              let blob = new Blob([array], { type: 'image/png' });
              // Use createObjectURL to make a URL for the blob
              let image = new Image();
              image.src = URL.createObjectURL(blob);
              image_product = image.src;
            } else {
              image_product = '';
            }
            product.image_product_no_active = image_product;
            this.list_product_no_active.push(product);
          });
        }
      }
      if (this.list_product.length > 0) {
        this.items_no_active = this.list_product_no_active;
        console.log(this.items_no_active);
      }
    },

    addProduct() {
      this.$router.push({ path: '/pd/request-products' });
    }
  }
};
</script>
