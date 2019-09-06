<template>
  <v-dialog v-model="dialog" width="30%" grid-list-md text-xs-center>
    <v-form ref="formCd">
      <v-card flat class="home-app-wrapper">
        <v-snackbar v-model="snackbar" absolute top right color="success">
          <span>Registration successful!</span>
          <v-icon dark>check_circle</v-icon>
        </v-snackbar>
        <v-toolbar dark color="primary" tabs>
          <v-toolbar-title class="font-weight-regular"
          >Cập nhật số lượng sản phẩm</v-toolbar-title
          >
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon dark @click="closePopup">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container grid-list-md text-xs-center>
          <v-layout row align-center fill-height>
            <v-flex md12>
              <v-slider
                v-model="product_quantity"
                color="orange"
                label="Số lượng sản phẩm: "
                min="1"
                max="100"
                thumb-label="always"
              ></v-slider>
            </v-flex>
          </v-layout>
          <v-layout row align-center fill-height>
            <v-flex md12>
              <v-btn outline color="pink" @click="handleAgree">Đồng Ý</v-btn>
              <v-btn outline color="primary" @click="handleCancel"
              >Hủy bỏ</v-btn
              >
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
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
      product_quantity: 1,
      dialog: false,
      isAgree: false,
      snackbar: false
    };
  },
  watch: {
    show(value) {
      this.dialog = value;
      if (this.dialog) {
        this.loadPopup();
      }
    }
  },

  created() {
    // this.dialog = this.show;
  },

  methods: {
    ...mapActions('Products', ['updateProduct', 'updateProductDetail']),

    loadPopup() {
      this.product_quantity = this.parameter.data.product_quantity;
      console.log(this.parameter.data);
    },

    emitCloseState() {
      this.$emit('close');
      this.dialog = false;
    },

    async handleAgree() {
      console.log(this.product_quantity);
      const result = this.parameter.data;
      if (result.product_detail_id === '') {
        console.log('asdsad');
        const update_product = await this.updateProduct({
          productQuantity: this.product_quantity,
          productId: result.product_id
        });
        console.log(update_product);
      } else {
        const update_product = await this.updateProductDetail({
          quantity: this.product_quantity,
          productDetailId: result.product_detail_id
        });
      }
      this.$emit('submit', this.product_quantity);
      this.product_quantity = 1;
      this.snackbar = true;
      this.emitCloseState();
    },
    handleCancel() {
      this.isAgree = false;
      this.emitCloseState();
    },
    closePopup() {
      this.isAgree = false;
      this.emitCloseState();
    }
  }
};
</script>
