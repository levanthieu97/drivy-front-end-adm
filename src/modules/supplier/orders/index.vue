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
                class="elevation-1 full_box_table headline"
              >
                <template slot="items" slot-scope="props">
                  <tr class="text-xs-center" @dblclick="openBill(props.item)">
                    <td>{{ props.item.no }}</td>
                    <td>MT00{{ props.item.id_bill }}</td>
                    <td>
                      {{ formatPrice(props.item.total) }}
                      <ins class="ml-1">đ</ins>
                    </td>
                    <td>{{ props.item.quantity }}</td>
                    <td>{{ props.item.date }}</td>
                    <td>{{ props.item.customer }}</td>
                    <td>{{ props.item.status }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </div>
    <bill-order
      :show="showPopup"
      :parameter="parameterPopup"
      @close="handleClosePopup"
      @updatestatus="updateStatus"
    />
    <!-- <test-life-cycle :asd="showPopup" /> -->
  </v-container>
</template>

<style scoped></style>

<script>
import { TABLE_PAGE_SIZES } from 'core/constants';
import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash';
import billOrder from './bill-order';
// import TestLifeCycle from './test';
export default {
  components: {
    billOrder
    // TestLifeCycle
  },

  data() {
    return {
      showPopup: false,
      parameterPopup: {
        data: {}
      },
      page_size: TABLE_PAGE_SIZES,
      _products: [],
      _products_detail: [],
      sum_product: [],
      list_order: [],
      items: [],
      headers: [
        {
          text: 'No',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Mã đơn hàng',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Doanh thu',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Số lượng',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Ngày đặt',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Người mua',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Trạng thái',
          sortable: false,
          align: 'center'
        }
      ]
    };
  },

  created() {
    console.log(this.me);
    console.log(this.theSupplier);
    this.listProduct();
  },

  computed: {
    ...mapGetters('login', ['me', 'theSupplier'])
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

  methods: {
    ...mapActions('Orders', ['listProductForSupplier']),

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    openBill(item) {
      this.showPopup = true;
      this.parameterPopup.data = item;
    },

    handleClosePopup() {
      this.showPopup = false;
    },

    updateStatus(flag) {
      console.log('xxxxxxxxxxxxxxxxxxxx');
      console.log(flag);
      this.showPopup = false;

      _.forEach(this.items, item => {
        if (item.id_bill === flag.payment_id) {
          item.status = flag.status;
        }
      });
    },

    showTest() {
      console.log('a');
    },

    async listProduct() {
      const { data, message, success } = await this.listProductForSupplier({
        supplierProfileId: this.theSupplier
      });
      if (data !== null) {
        _.forEach(data, item => {
          var sum_price = 0;
          _.forEach(item.products, product => {
            sum_price += product.alter_price;
          });
          let payment = {
            id_bill: '',
            total: '',
            quantity: '',
            date: '',
            customer: '',
            status: ''
          };
          payment.id_bill = item.payment_id;
          payment.date = item.create_date;
          payment.customer = item.name_customer;
          payment.status = item.status;
          payment.quantity = item.products.length;
          payment.total = sum_price;
          payment.phone = item.phone;
          payment.address = item.address;
          payment.city_name = item.city_name;
          payment.type_address = item.type_address;
          payment.type_payment = item.type_payment;
          this.list_order.push(payment);
        });
        this.items = this.list_order;
        this._products = data;
      }
    }
  }
};
</script>
