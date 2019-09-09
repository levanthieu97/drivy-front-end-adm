<template>
  <v-container grid-list-md fluid class="pt-1">
    <v-layout row wrap style="margin-top:10px">
      <v-flex xs12 md12>
        <span>
          <v-btn flat icon>
            <v-icon class="mr-2 mt-0" @click="back">keyboard_backspace</v-icon>
          </v-btn>
        </span>
        <span>
          <v-btn color="pink" dark class="text-none" @click="allowProduct"
          >Cho phép đăng bán</v-btn
          >
        </span>
        <span>
          <v-btn color="primary" class="text-none" @click="rejectProduct"
          >Từ chối</v-btn
          >
        </span>
      </v-flex>
      <v-flex xs2 md1>
        <div id="listImg">
          <div
            v-for="(image, i) in convert"
            :key="i"
            class="pa-1"
            style="cursor:pointer; border:2px solid black; margin-top:3px"
            @click="choseImage(image)"
          >
            <v-img :src="image" aspect-ratio="1" width="80px"></v-img>
          </div>
        </div>
      </v-flex>
      <v-flex xs4 md3>
        <div>
          <v-img :src="currImage" aspect-ratio="1" />
        </div>
      </v-flex>
      <v-flex xs6 md8 class="pl-2">
        <div>
          <p class="headline mb-0" style="color:#004D40">{{ nameProduct }}</p>
        </div>
        <v-layout row wrap>
          <v-flex xs6 md12>
            <div>
              <span style="color:#616161;margin:0px" class="pt-1x"
              >Thương hiệu: {{ brand }}</span
              >
              <span class="ml-5" />
              <span style="color:#616161;" class="pt-1x"
              >Mã sản phẩm: {{ skuProduct }}</span
              >
            </div>
          </v-flex>
        </v-layout>
        <v-divider />
        <v-layout row wrap>
          <v-flex xs12 md12>
            <div>
              <span style="color:#D50000" class="headline">{{
                formatPrice(price)
              }}</span>
              <span style="color:#D50000" class="title">đ</span>
            </div>
            <div>
              <span style="color:#616161;" class="mr-1">Tiết kiệm:</span>
              <span style="color:#D50000" class="mr-1">{{ percent }}%</span>
              <span style="color:#616161">({{ formatPrice(sale) }}đ)</span>
            </div>
            <div>
              <span style="color:#616161;" class="mr-1">Giá thị trường:</span>
              <span style="color:#616161;">{{ formatPrice(cost) }}đ</span>
            </div>
            <div class="mt-2">
              <ul style="list-style-type:none" class="pl-0">
                <li v-for="i in mainProduct.product_description" :key="i">
                  <p class="mb-1">{{ i }}</p>
                </li>
              </ul>
            </div>
          </v-flex>
          <v-flex md12 xs12 class="mt-1">
            <v-layout row>
              <v-flex xs5 md5>
                <div>
                  <v-btn class="white--text" color="#DD2C00">
                    Chọn mua
                    <v-icon right dark>add_shopping_cart</v-icon>
                  </v-btn>
                </div>
              </v-flex>
            </v-layout>
            <div v-if="currQuantity > 0">
              <span class="mr-1">Cửa hàng còn</span>
              <span class="mr-1 red--text">{{ this.currQuantity }}</span>
              <span>sản phẩm</span>
            </div>
            <div v-else>
              <span class="red--text">Hiện tại sản phẩm đang hết hàng !</span>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import _ from 'lodash';
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      response: '',
      convert: [],
      currImage: '',
      nameProduct: '',
      brand: '',
      skuProduct: '',
      price: '',
      currQuantity: '',
      percent: '',
      sale: '',
      cost: '',
      mainProduct: '',
      product_description: '',
      orderProduct: {},
      images: []
    };
  },
  watch: {
    $route: {
      immediate: true,
      async handler($route) {
        this.response = $route.params.product;
      }
    }
  },

  computed: {
    ...mapGetters('login', ['role', 'theSupplier'])
  },

  created() {
    if (this.role !== 'ROLE_ADMIN') {
      this.$router.push({ path: '/403' });
    } else {
      this.takeInfoProduct();
      this.getImageProduct();
    }
  },

  methods: {
    ...mapActions('Check', ['getInfoProductByProductName', 'listImage']),
    ...mapActions('ManageProduct', ['updateProductActive']),

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    async takeInfoProduct() {
      const { data, success, message } = await this.getInfoProductByProductName(
        {
          productName: this.response
        }
      );
      console.log(data);
      this.currQuantity = data.product_quantity;
      this.orderProduct.product_id = data.product_id;
      this.nameProduct = data.product_name;
      this.mainProduct = data;
      this.skuProduct = this.mainProduct.product_code;
      this.price = data.alter_price;
      this.cost = data.price;
      this.sale = this.cost - this.price;
      this.percent =
        100 - parseFloat((this.price / this.cost).toFixed(2)) * 100;
      let new_str = data.product_description.split('\n');
      this.mainProduct.product_description = new_str;
    },

    choseImage(item) {
      this.currImage = item;
    },
    back() {
      this.$router.push({ path: '/manage-product' });
    },

    async rejectProduct() {
      await this.updateProductActive({
        isActive: 2,
        productId: this.orderProduct.product_id
      });
      this.$router.push({ path: '/manage-product' });
    },

    async allowProduct() {
      await this.updateProductActive({
        isActive: 1,
        productId: this.orderProduct.product_id
      });
      this.$router.push({ path: '/manage-product' });
    },

    async getImageProduct() {
      const { data, success, message } = await this.listImage({
        productName: this.response
      });
      this.images.push(data.product_image);
      _.forEach(data.product_images, item => {
        this.images.push(item.picture);
      });
      _.forEach(this.images, item => {
        const temp = item;
        if (temp != null) {
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
          item = image.src;
          this.convert.push(item);
        } else {
          item = '';
        }
        this.currImage = this.convert[0];
      });
    }
  }
};
</script>

<style></style>
