<template>
  <v-container class="home-app-wrapper" grid-list-md fluid>
    <div class="block">
      <v-card class="decorate_area no_box_shadow">
        <v-card-text>
          <v-layout row wrap>
            <v-flex md12>
              <v-data-table
                :headers="headers"
                :items="items"
                :rows-per-page-items="page_size"
                class="elevation-1 headline"
              >
                <template slot="items" slot-scope="props">
                  <tr>
                    <td class="text-xs-center">{{ props.item.no }}</td>
                    <td class="text-xs-center">
                      <v-img
                        :src="props.item.product_image"
                        aspect-ratio="1"
                        width="90px"
                      ></v-img>
                    </td>
                    <td>
                      <div class="text-uppercase font-weight-medium blue--text">
                        {{ props.item.product_name }}
                      </div>
                      <div>
                        <span>SKU:</span>
                        <span class="ml-1">{{ props.item.product_code }}</span>
                        <span class="mx-4">-</span>
                        <span>Số lượng:</span>
                        <span class="ml-1">
                          {{ props.item.product_quantity }}
                        </span>
                      </div>
                    </td>
                    <td class="text-xs-center">
                      {{ formatPrice(props.item.alter_price) }}
                      <ins class="ml-1">đ</ins>
                    </td>
                    <td class="text-xs-center">{{ props.item.store_name }}</td>
                    <td class="text-xs-center">{{ props.item.create_date }}</td>
                    <td class="justify-center layout text-xs-center">
                      <v-icon
                        class="mr-2 mt-5"
                        @click="editProducts(props.item)"
                      >edit</v-icon
                      >
                      <v-icon class="mr-2 mt-5" @click="changeUsed(props.item)"
                      >zoom_in</v-icon
                      >
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </div>
    <!-- <test-life-cycle :asd="showPopup" /> -->
    <edit-product
      :show="showPopupEdit"
      :parameter="parameterPopupEdit"
      @close="closePopupEdit"
      @result="resultStatus"
    />
  </v-container>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';
import { TABLE_PAGE_SIZES } from 'core/constants';
import editProduct from './edit-product';
export default {
  components: {
    editProduct
  },

  data() {
    return {
      showPopupEdit: false,
      page_size: TABLE_PAGE_SIZES,
      items: [],
      products: [],
      parameterPopupEdit: {
        data: {}
      },
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
          text: 'Giá bán',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Nhà cung cấp',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Ngày tạo',
          sortable: false,
          align: 'center'
        },
        {
          text: '',
          sortable: false,
          align: 'center'
        }
      ]
    };
  },

  watch: {
    items: {
      handler() {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].no = i + 1;
        }
      }
    }
  },

  computed: {
    ...mapGetters('login', ['role', 'theSupplier', 'me'])
  },

  created() {
    if (this.role !== 'ROLE_ADMIN') {
      this.$router.push({ path: '/403' });
    } else {
      this.loadData();
    }
  },
  methods: {
    ...mapActions('ManageProduct', [
      'listProductsNoActive',
      'updateProductActive'
    ]),

    async loadData() {
      const { data, success, message } = await this.listProductsNoActive();
      this.products = data;
      if (this.products.length > 0) {
        _.forEach(this.products, item => {
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
          item.product_image = image_product;
        });
      }
      this.items = this.products;
    },

    editProducts(item) {
      this.parameterPopupEdit.data = item;
      this.showPopupEdit = true;
    },

    async changeUsed(item) {
      console.log(item);
      await this.$router.push({
        name: 'product',
        params: { product: item.product_name }
      });
    },

    closePopupEdit(flag) {
      this.showPopupEdit = false;
    },

    async resultStatus(flag, id) {
      await this.updateProductActive({
        isActive: flag.is_active,
        productId: id
      });
      this.showPopupEdit = false;
      this.loadData();
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }
};
</script>

<style></style>
