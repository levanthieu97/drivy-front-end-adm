<template>
  <v-dialog v-model="dialog" width="65%">
    <v-card>
      <v-toolbar dark color="#337ab7" tabs>
        <v-toolbar-title class="font-weight-regular"
        >Đơn Hàng MT00{{ payment.id_bill }}</v-toolbar-title
        >
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon dark @click="closePopup">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container grid-list-md class="pt-1">
        <v-layout wrap row>
          <v-flex xs9 md6 lg6 class="pl-0">
            <v-select v-model="status" :items="data_status" chips>
              <template slot="prepend">
                <v-chip
                  class="mr-0 subheading font-weight-regular"
                  style="background-color:white"
                >Trạng thái đơn hàng:</v-chip
                >
              </template>
            </v-select>
          </v-flex>
          <v-flex xs2 md2 lg2>
            <v-btn
              outline
              color="indigo"
              class="text-none mt-4"
              @click="update_status"
            >Cập Nhật</v-btn
            >
          </v-flex>
          <v-flex xs12 md12 lg12 style="border: 1px solid pink">
            <div>
              <v-icon color="#00695C">person_pin_circle</v-icon>
              <span class="ml-1 font-weight-regular" style="color:#00695C"
              >Địa Chỉ Nhận Hàng</span
              >
            </div>
            <div class="mt-2 ml-1">
              <span class="font-weight-medium mr-5"
              >- Tên người nhận: {{ payment.customer }}</span
              >
              <span class="mx-5"></span>
              <span class="font-weight-regular ml-5"
              >- Số điện thoại: {{ payment.phone }}</span
              >
            </div>
            <div class="mt-2 ml-1">
              <span class="font-weight-regular mr-1"
              >- Địa chỉ: {{ payment.address }}</span
              >
              <span>,{{ payment.city_name }}</span>
            </div>
            <div class="mt-2 ml-1">
              <span class="font-weight-regular mr-1"
              >- Hình thức thanh toán: {{ payment.type_payment }}</span
              >
            </div>
          </v-flex>
        </v-layout>
        <v-layout wrap row class="mt-3">
          <v-flex xs12 md12 class="ma-0 pa-0">
            <v-data-table
              :headers="headers"
              :items="items"
              :rows-per-page-items="page_size"
              :rows-per-page-text="row_page"
              class="elevation-1 full_box_table headline"
            >
              <template slot="items" slot-scope="props">
                <tr class="text-xs-center">
                  <td>
                    <v-img
                      :src="props.item.image"
                      aspect-ratio="1"
                      width="80px"
                    ></v-img>
                  </td>
                  <td v-if="props.item.color_name !== ''">
                    <span>{{ props.item.product_name }}</span>
                    <span>
                      (size: {{ props.item.size_name }} - màu:
                      {{ props.item.color_name }})
                    </span>
                  </td>
                  <td v-else>{{ props.item.product_name }}</td>
                  <td>{{ props.item.quantity }}</td>
                  <td>
                    {{ formatPrice(props.item.price) }}
                    <ins class="ml-1">đ</ins>
                  </td>
                  <td>
                    {{ formatPrice(props.item.price * props.item.quantity) }}
                    <ins class="ml-1">đ</ins>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<style></style>

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
      page_size: TABLE_PAGE_LENGTH,
      dialog: false,
      status: '',
      payment: '',
      data_status: [
        'Tiếp nhận đơn hàng',
        'Đang giao hàng',
        'Giao hàng thành công'
      ],
      items: [],
      list_product: [],
      list_product_detail: [],
      products: [],
      row_page: 'Số sản phẩm: ',
      headers: [
        {
          text: '',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Sản phẩm',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Giá',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Số lượng',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Thành tiền',
          sortable: false,
          align: 'center'
        }
      ]
    };
  },

  created() {},
  computed: {
    ...mapGetters('login', ['me', 'theSupplier'])
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
        this.emitCloseState();
      }
    }
  },
  methods: {
    ...mapActions('Orders', [
      'getProductOrder',
      'getProductDetailOrder',
      'updateStatusPayment'
    ]),

    closePopup() {
      this.dialog = false;
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    async loadPopup() {
      console.log('xxx ');
      console.log(this.parameter.data);
      let element = this.parameter.data;
      this.status = element.status;
      this.payment = this.parameter.data;
      const result_product = await this.getProductOrder({
        paymentId: this.parameter.data.id_bill,
        supplierProfileId: this.theSupplier
      });
      let element_product = [];

      console.log(result_product.data);

      if (result_product.data !== null) {
        this.list_product = result_product.data.products;
        if (this.list_product.length > 0) {
          _.forEach(this.list_product, item => {
            let obj = {};
            obj.product_name = item.product_name;
            obj.quantity = item.product_quantity_buy;
            obj.sku = item.product_code;
            obj.price = item.alter_price;
            obj.color_name = '';
            obj.size_name = '';
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
            obj.image = image_product;
            element_product.push(obj);
          });
        }
      }

      const result_detail = await this.getProductDetailOrder({
        paymentId: this.parameter.data.id_bill,
        supplierProfileId: this.theSupplier
      });
      if (result_detail.data !== null) {
        this.list_product_detail = result_detail.data.product_order_details;
        console.log(this.list_product_detail);
        if (this.list_product_detail.length > 0) {
          _.forEach(this.list_product_detail, item => {
            let obj = {};
            obj.product_name = item.product_name;
            obj.quantity = item.product_quantity_buy;
            obj.sku = item.sku;
            obj.price = item.pd_price;
            obj.color_name = item.color_name;
            obj.size_name = item.size_name;
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
            obj.image = image_product;
            element_product.push(obj);
          });
        }
      }

      console.log('piw');
      console.log(element_product);
      let result = element_product;
      this.items = result;
    },

    emitCloseState() {
      this.$emit('close');

      //emit khi báo event cho component khai báo để xử lý
      //listeners lắng nghe sự kiện trong component
    },
    async update_status() {
      let element = {
        payment_id: this.parameter.data.id_bill,
        status: this.status
      };
      const { data, message, success } = await this.updateStatusPayment({
        status: this.status,
        paymentId: element.payment_id
      });
      this.$emit('updatestatus', element);
    }
  }
};
</script>
