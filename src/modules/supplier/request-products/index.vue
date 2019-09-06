<template>
  <v-container class="home-app-wrapper" grid-list-md fluid>
    <div class="block">
      <v-card class="decorate_area no_box_shadow">
        <v-card-text>
          <v-layout row wrap>
            <v-flex md12 xs12>
              <h4>Tìm kiếm sản phẩm trong hệ thống trước khi tạo mới.</h4>
            </v-flex>
            <v-flex md6>
              <v-text-field v-model="searchProductName" label></v-text-field>
            </v-flex>
            <v-flex md2>
              <v-btn
                style="width: 150px; margin-top:15px; margin-left:40px;"
                flat
                class="btn_ui_back"
                @click="btnSearch"
              >
                <span>Search</span>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout v-if="loadingForm === false" row wrap>
            <div>
              Không tìm thấy sản phẩm bạn muốn?
              <v-btn flat small color="blue" @click="newProduct"
              >Tạo sản phẩm mới</v-btn
              >
            </div>
          </v-layout>
          <v-layout v-else-if="loadingForm === true" row wrap>
            <v-flex md12 xs12>
              <div>
                Không tìm thấy sản phẩm bạn muốn?
                <v-btn flat small color="blue" @click="newProduct"
                >Tạo sản phẩm mới</v-btn
                >
              </div>
            </v-flex>
            <v-flex md2 xs6>
              <ul style="list-style-type: none;margin: 0px;padding: 0px;">
                <li v-for="attr in details" :key="attr.cate_setting_id">
                  <v-layout justify-center row wrap>
                    <v-flex xs12 md12>
                      <v-toolbar>
                        <div>{{ attr.setting_name }}</div>
                      </v-toolbar>
                      <v-card>
                        <v-card-text style="padding:0px">
                          <v-layout row wrap>
                            <v-flex
                              v-for="temp in attr.category_details"
                              :key="temp.cate_details_id"
                              md12
                              xs12
                              style="padding:0px;"
                            >
                              <ul style="list-style-type: circle;">
                                <li>
                                  <v-btn
                                    flat
                                    small
                                    style="padding:0px"
                                    @click="
                                      requestProducts(temp.cate_details_type)
                                    "
                                  >{{ temp.cate_details_type }}</v-btn
                                  >
                                </li>
                              </ul>
                            </v-flex>
                          </v-layout>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </li>
              </ul>
            </v-flex>
            <v-flex md10 xs12>
              <v-toolbar color="blue-grey lighten-2" dark>
                <v-toolbar-title>Danh sách sản phẩm</v-toolbar-title>
              </v-toolbar>
              <v-card>
                <v-container fluid grid-list-lg>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-data-table
                        :headers="headers"
                        :items="items"
                        :rows-per-page-items="page_size"
                        class="elevation-1 full_box_table display"
                      >
                        <template slot="items" slot-scope="props">
                          <tr>
                            <td class="text-xs-center">{{ props.item.id }}</td>
                            <td width="20%">
                              <v-img
                                :src="props.item.product_image"
                                alt="Image Products"
                              ></v-img>
                            </td>
                            <td class="text-xs-center">
                              <div
                                class="text-uppercase font-weight-medium blue--text"
                              >
                                {{ props.item.product_name }}
                              </div>
                              <div>Min Code: {{ props.item.product_code }}</div>
                              <div>
                                Giá niêm yết:
                                {{ formatPrice(props.item.price) }}
                                <ins>đ</ins>
                              </div>
                            </td>
                            <td>
                              <div class="text-xs-center">
                                <v-btn
                                  small
                                  round
                                  color="blue"
                                  dark
                                  @click="showProductDetail(props.item)"
                                >Đăng bán sản phẩm này</v-btn
                                >
                              </div>
                            </td>
                          </tr>
                        </template>
                      </v-data-table>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </div>
    <buy-product
      :show="showPopup"
      :parameter="parameterPopup"
      @close="handleClosePopup"
    />
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import _ from 'lodash';
import { TABLE_PAGE_SIZES } from 'core/constants';
import buyProduct from './buy-product';
export default {
  components: {
    buyProduct
  },
  data() {
    return {
      page_size: TABLE_PAGE_SIZES,
      searchProductName: '',
      selected: [],
      showPopup: false,
      parameterPopup: {
        data: {}
      },
      expand: true,
      loadingForm: null,
      items: [],
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
          align: 'center'
        },
        {
          text: '',
          sortable: false
        }
      ],
      details: []
    };
  },

  watch: {
    items: {
      handler() {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].id = i + 1;
        }
      }
    }
  },

  /**************** INIT ****************/
  created() {
    this.chooseSettingDetail();
  },

  methods: {
    ...mapActions('AllProducts', [
      'searchProducts',
      'optionSetting',
      'getProductDetail',
      'showProductDetails'
    ]),

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    async btnSearch() {
      if (this.searchProductName === '') {
        this.loadingForm = false;
      } else {
        this.loadingForm = true;
        const { data, success, message = '' } = await this.searchProducts({
          name: this.searchProductName
        });
        console.log(data);
        this.items = data;
        _.forEach(this.items, item => {
          const temp = item.product_image;
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
            item.product_image = image.src;
          } else {
            item.product_image = '';
          }
        });
      }
    },

    newProduct() {
      this.$router.push('/new-product');
    },

    handleClosePopup() {
      this.showPopup = false;
    },

    async showProductDetail(item) {
      this.showPopup = true;
      this.parameterPopup.data = item;
    },

    async chooseSettingDetail() {
      const { data, success, message } = await this.optionSetting();
      this.details = data;
    },

    async requestProducts(item) {
      const { data, success, message = '' } = await this.getProductDetail({
        cateDetailsType: item
      });
      this.items = data;
      _.forEach(this.items, item => {
        const temp = item.product_image;
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
          item.product_image = image.src;
        } else {
          item.product_image = '';
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.rowColor {
  background-color: #c6e0b4;
}
.rowColorDefer {
  background-color: #d9e1f2;
}
table.v-table tbody td:first-child,
table.v-table tbody td:not(:first-child),
table.v-table tbody th:first-child,
table.v-table tbody th:not(:first-child),
table.v-table thead td:first-child,
table.v-table thead td:not(:first-child),
table.v-table thead th:first-child,
table.v-table thead th:not(:first-child) {
  padding: 0 10px;
}

.display tr:hover td {
  background-color: rgb(161, 247, 247);
}
.btn {
  padding: 0;
  margin: 0;
}
</style>
