<template>
  <v-container class="home-app-wrapper" grid-list-md fluid>
    <v-stepper v-model="step" non-linear>
      <v-stepper-header>
        <v-stepper-step
          :complete="step > 1"
          step="1"
          :rules="[() => !errors.has('name') && !errors.has('email')]"
        >Danh mục</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step
          :complete="step > 2"
          step="2"
          :rules="[
            () =>
              !errors.has('product_name') &&
              !errors.has('city') &&
              !errors.has('state')
          ]"
        >Thông tin cơ bản</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step
          :complete="step > 3"
          step="3"
          :rules="[() => !errors.has('numtickets') && !errors.has('shirtsize')]"
        >Lựa chọn sản phẩm</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step
          step="4"
          :rules="[() => !errors.has('numtickets') && !errors.has('shirtsize')]"
        >Hình ảnh</v-stepper-step
        >
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card>
            <v-toolbar card dark color="primary">
              <v-icon>shopping_cart</v-icon>
              <v-toolbar-title>Danh mục sản phẩm</v-toolbar-title>
            </v-toolbar>

            <v-layout wrap row style="margin-top:10px;">
              <v-flex xs12 md4 d-flex>
                <v-select
                  v-model="cate_id"
                  :items="categories"
                  box
                  label="Danh mục sản phẩm"
                ></v-select>
              </v-flex>

              <v-flex xs12 md4 d-flex>
                <v-select
                  v-model="setting_id"
                  :items="settings"
                  box
                  label="danh mục chi tiết"
                ></v-select>
              </v-flex>

              <v-flex xs12 md4 d-flex>
                <v-select
                  v-model="detail_id"
                  :items="details"
                  box
                  label="danh mục chi tiết"
                ></v-select>
              </v-flex>
              <v-divider vertical></v-divider>
            </v-layout>

            <v-divider></v-divider>
          </v-card>
          <v-spacer />
          <v-btn
            :disabled="flat"
            class="text-capitalize ml-0"
            outline
            color="pink"
            @click="stepTwo"
          >Tiếp tục</v-btn
          >
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card>
            <v-toolbar card dark color="primary">
              <v-icon>insert_comment</v-icon>
              <v-toolbar-title>Thông tin về sản phẩm</v-toolbar-title>
              <v-spacer />
              Danh mục: {{ detail_id }}
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-layout wrap row style="margin-top:10px;">
                  <v-flex md6 xs12>
                    <v-text-field
                      ref="product_name"
                      v-model="product.product_name"
                      :rules="nameRules"
                      label="Tên sản phẩm"
                      required
                      :error-messages="errors.collect('Tên sản phẩm')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md1 />
                  <v-flex md5 xs12>
                    <v-text-field
                      ref="product_code"
                      v-model="product.product_code"
                      :rules="codeRules"
                      label="Mã sản phẩm"
                      required
                      :error-messages="errors.collect('Mã sản phẩm')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md6 xs12>
                    <v-text-field
                      ref="short_description"
                      v-model="product.short_description"
                      :rules="shortDescriptionRules"
                      label="Giới thiệu sản phẩm"
                      required
                      :error-messages="errors.collect('Giới thiệu')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md1 />
                  <v-flex md5 xs12>
                    <v-text-field
                      ref="product_quantity"
                      v-model="product.product_quantity"
                      :rules="quantityRules"
                      label="Số lượng"
                      type="number"
                      required
                      :error-messages="errors.collect('Số lượng')"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md6 xs12>
                    <v-text-field
                      ref="price"
                      v-model="product.price"
                      label="Giá niêm yết"
                      :rules="priceRules"
                      required
                      type="number"
                      suffix="VND"
                      :error-messages="errors.collect('Giá niêm yết')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md1></v-flex>
                  <v-flex md5 xs12>
                    <v-text-field
                      ref="alter_price"
                      v-model="product.alter_price"
                      :rules="alterPriceRules"
                      label="Giá bán"
                      required
                      type="number"
                      suffix="VND"
                      :error-messages="errors.collect('Giá bán')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md6 xs12>
                    <v-textarea
                      ref="product_description"
                      v-model="product.product_description"
                      color="teal"
                      height="190px"
                    >
                      <template v-slot:label>
                        <div>
                          Đặc điểm nổi bật
                          <small
                          >(Mô tả bắt đầu bằng các ký tự như:"-,+")</small
                          >
                        </div>
                      </template>
                    </v-textarea>
                  </v-flex>
                  <v-flex md1></v-flex>
                  <v-flex md5 xs12>
                    <img v-if="imageUrl" :src="imageUrl" height="150" />
                    <v-text-field
                      ref="product_image"
                      v-model="imageName"
                      label="Chọn ảnh sản phẩm"
                      prepend-icon="attach_file"
                      @click="pickFile"
                    ></v-text-field>
                    <input
                      ref="image"
                      type="file"
                      style="display: none"
                      accept="image/*"
                      @change="onFilePicked"
                    />
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
          <v-divider></v-divider>

          <v-layout row wrap>
            <v-flex>
              <v-btn class="text-capitalize" flat @click.native="step = 1"
              >Quay lại</v-btn
              >
              <v-btn
                class="text-capitalize"
                outline
                color="pink"
                @click="stepThree"
              >Tiếp tục</v-btn
              >
            </v-flex>
          </v-layout>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card>
            <v-toolbar card dark color="primary">
              <v-icon>add_comment</v-icon>
              <v-toolbar-title>Lựa chọn sản phẩm</v-toolbar-title>
              <v-spacer />
              Danh mục: {{ detail_id }}
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <v-layout wrap row style="margin-top:10px;">
                  <v-flex md12 xs12>
                    <ul style="list-style-type:none">
                      <v-layout row wrap>
                        <li
                          v-for="catalog in catalogs"
                          :key="catalog.type_name"
                          style="width:550px;"
                        >
                          <v-layout row wrap>
                            <v-flex md4 xs4>
                              <v-subheader
                              >{{ catalog.type_name }} :</v-subheader
                              >
                            </v-flex>
                            <v-flex md6 xs8>
                              <v-select
                                v-model="catalog[catalog.status]"
                                :items="catalog.catalogs"
                                item-text="catalog_name"
                                item-value="catalog_id"
                                style="margin-top:0px;padding-top:0px"
                              ></v-select>
                            </v-flex>
                          </v-layout>
                        </li>
                      </v-layout>
                    </ul>
                  </v-flex>
                </v-layout>
              </v-form>

              <v-layout row wrap>
                <v-flex md12 style="margin-left:20px">
                  <v-btn
                    color="teal darken-1"
                    dark
                    class="text-capitalize"
                    @click="addDistinctProduct"
                  >
                    <v-icon dark small style="padding-left:0px;">add</v-icon
                    >Phân loại
                  </v-btn>
                </v-flex>
                <v-flex md12>
                  <ul style="list-style-type:none">
                    <v-layout row wrap>
                      <li
                        v-for="(input, i) in inputs"
                        :key="i"
                        style="width:300px;margin-right:50px"
                      >
                        <v-form ref="form">
                          <v-flex md12>
                            <v-card>
                              <v-toolbar card color="teal darken-1" dark>
                                <v-toolbar-title
                                >Mặt hàng {{ i + 1 }}</v-toolbar-title
                                >
                                <v-spacer />
                                <v-toolbar-items>
                                  <v-btn icon dark @click="closeItem(input, i)">
                                    <v-icon>close</v-icon>
                                  </v-btn>
                                </v-toolbar-items>
                              </v-toolbar>
                              <v-card-text>
                                <v-text-field
                                  v-model="input.sku"
                                  :counter="10"
                                  label="SKU"
                                  required
                                ></v-text-field>
                                <v-select
                                  v-model="input.size_id"
                                  :items="sizes"
                                  item-text="size_name"
                                  item-value="size_id"
                                  label="Size"
                                  required
                                ></v-select>
                                <v-select
                                  v-model="input.color_id"
                                  :items="colors"
                                  :rules="[v => !!v || 'Vui lòng chọn màu']"
                                  label="màu sắc"
                                  item-text="color_name"
                                  item-value="color_id"
                                  required
                                ></v-select>
                                <!-- <div>
                                  <h2>Select an image</h2>
                                  <input
                                    :id="'test'+i"
                                    type="file"
                                    @change="onFileChange($event,i)"
                                  />
                                </div>
                                <div v-if="inputs[i]">
                                  <img :src="inputs[i]" />
                                </div>-->
                                <v-text-field
                                  v-model="input.price"
                                  :rules="alterPriceRules"
                                  required
                                  label="Giá bán"
                                  type="number"
                                  suffix="VND"
                                ></v-text-field>
                                <v-text-field
                                  v-model="input.quantity"
                                  required
                                  label="Số lượng"
                                  type="number"
                                ></v-text-field>
                                <img
                                  v-if="imageFileDistinct[i]"
                                  :src="imageUrlDistinct[i]"
                                  height="150"
                                />
                                <v-text-field
                                  v-model="imageDistinct[i]"
                                  label="Chọn ảnh sản phẩm"
                                  prepend-icon="attach_file"
                                  @click="pickFileImage(i)"
                                ></v-text-field>
                                {{ imageDistinct[i] }}
                                <input
                                  :id="'test' + i"
                                  ref="inputs"
                                  type="file"
                                  style="display: none"
                                  accept="image/*"
                                  @change="onFileChange($event, i)"
                                />
                              </v-card-text>
                            </v-card>
                          </v-flex>
                        </v-form>
                      </li>
                    </v-layout>
                  </ul>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-btn flat @click.native="step = 2">Quay lại</v-btn>
          <v-btn color="primary" @click="stepFour">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card>
            <v-toolbar card dark color="primary">
              <v-icon>photo_library</v-icon>
              <v-toolbar-title>Hình ảnh</v-toolbar-title>
              <v-spacer />
              Danh mục: {{ detail_id }}
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-layout row wrap>
                  <v-flex md12 xs12 d-flex>
                    <div
                      id="my-strictly-unique-vue-upload-multiple-image"
                      style="display: flex; justify-content: center;"
                    >
                      <vue-upload-multiple-image
                        :data-images="images"
                        id-upload="myIdUpload"
                        edit-upload="myIdEdit"
                        :rules="uploadImage"
                        @upload-success="uploadImageSuccess"
                        @before-remove="beforeRemove"
                        @edit-image="editImage"
                      ></vue-upload-multiple-image>
                    </div>
                  </v-flex>
                  <v-flex md12 xs12 d-flex>
                    <v-subheader
                    >Lưu ý : Upload hình có kích thước 150x150.</v-subheader
                    >
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
          <v-btn flat @click.native="step = 3">Previous</v-btn>
          <v-btn color="primary" @click="submit">Save</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VueUploadMultipleImage from 'vue-upload-multiple-image';
import _ from 'lodash';
export default {
  components: {
    VueUploadMultipleImage
  },
  data() {
    return {
      flat: true,
      step: 1,
      sizex: null,
      colorx: null,
      product: {
        product_id: '',
        product_name: '',
        product_code: '',
        product_description: '',
        short_description: '',
        product_quantity: '',
        product_image: '',
        price: '',
        alter_price: '',
        store_supplier: '',
        path: '',
        pd_catalog: '',
        supplier_product: '',
        category_detail_id: '',
        is_active_product: '',
        product_detail: [],
        image_detail: []
      },

      nameRules: [v => !!v || 'Vui lòng nhập tên sản phẩm'],
      codeRules: [v => !!v || 'Vui lòng nhập mã sản phẩm'],
      quantityRules: [v => v < 51 || 'Số lượng không lớn hơn 50'],
      shortDescriptionRules: [v => !!v || 'Vui lòng nhập giới thiệu sản phẩm'],
      priceRules: [v => !!v || 'Vui lòng nhập giá niêm yết'],
      alterPriceRules: [v => !!v || 'Vui lòng nhập giá sản phẩm'],
      uploadImage: [v => v < 4 || 'Số lượng không lớn hơn 3'],

      open: [],
      categories: [],
      isLoading: false,
      details: [],
      settings: [],
      cate_id: '',
      setting_id: '',
      detail_id: '',
      imageName: '',
      imageUrl: '',
      imageFile: '',
      properties: [],
      catalogs: [],
      images: [],
      path: [],

      inputs: [],
      colors: [],
      sizes: [],

      imageDistinct: [],
      imageUrlDistinct: [],
      imageFileDistinct: []
    };
  },

  computed: {
    ...mapGetters('login', ['role', 'theSupplier'])
  },

  watch: {
    cate_id() {
      const set = [];
      _.forEach(this.open, category => {
        if (this.cate_id === category.category_name) {
          _.forEach(category.category_settings, setting => {
            set.push(setting.setting_name);
          });
        }
      });
      this.settings = set;
      this.details = [];
      this.detail_id = '';
      this.flat = true;
    },
    setting_id() {
      const set = [];
      _.forEach(this.open, category => {
        if (this.cate_id === category.category_name) {
          _.forEach(category.category_details, setting => {
            if (setting.category_setting.setting_name === this.setting_id) {
              set.push(setting.cate_details_type);
            }
          });
        }
        // this.settings.push(category.setting_name);
        // console.log(category.category_name);
      });
      this.details = set;
      this.flat = true;
    },
    detail_id() {
      if (this.detail_id !== '') {
        this.flat = false;
      }
      this.requestCatalog();
    },

    inputs() {
      _.forEach(this.inputs, list => {});
      this.product.product_detail = this.inputs;
    }
  },

  created() {
    this.requestCategory();
    this.requestColor();
    this.requestSize();
    this.product.price = 10000;
    this.product.alter_price = 10000;
  },

  methods: {
    ...mapActions('CreateProduct', [
      'getCategory',
      'getNameCatalog',
      'addInfoProduct',
      'addProductCatalog',
      'getColor',
      'getSize',
      'checkExistProduct'
    ]),

    async existProduct(productName) {
      const { data, success, message } = await this.checkExistProduct({
        productNameCompare: productName
      });
      return data;
    },

    stepTwo() {
      this.step = 2;
    },

    async stepThree() {
      if (!this.product.product_name) {
        this.$refs.product_name.focus();
      } else if (
        this.product.product_name.includes('/') ||
        this.product.product_name.includes('^') ||
        this.product.product_name.includes('#') ||
        this.product.product_name.includes('&') ||
        this.product.product_name.includes('%') ||
        this.product.product_name.includes('*') ||
        this.product.product_name.includes('!')
      ) {
        this.$message.error('Tên sản phẩm không được có ký tự đặc biệt !');
      } else if (!this.product.product_code) {
        this.$refs.product_code.focus();
      } else if (!this.product.short_description) {
        this.$refs.short_description.focus();
      } else if (
        !this.product.product_quantity ||
        this.product.product_quantity < 1
      ) {
        this.$message.error('Vui lòng cập nhật số lượng sản phẩm !');
        this.$refs.product_quantity.focus();
      } else if (!this.product.price || this.product.price < 1000) {
        this.$message.error('Vui lòng cập nhật giá niêm yết sản phẩm !');
        this.$refs.price.focus();
      } else if (!this.product.alter_price || this.product.alter_price < 1000) {
        this.$message.error('Vui lòng cập nhật giá bán sản phẩm !');
        this.$refs.alter_price.focus();
      } else if (!this.product.product_description) {
        this.$refs.product_description.focus();
      } else if (this.product.alter_price > this.product.price) {
        this.$message.error('Giá bán phải nhỏ hơn giá niêm yết !');
      } else if ((await this.existProduct(this.product.product_name)) > 0) {
        this.$message.error('Tên sản phẩm này đã tồn tại');
      } else {
        this.step = 3;
      }
    },

    stepFour() {
      this.step = 4;
    },

    async submit() {
      let temp = [];
      _.forEach(this.catalogs, cata => {
        temp.push(cata.null);
      });
      // this.product.category_detail_id = this.detail_id;
      this.product.pd_catalog = temp;
      for (let i = 0; i < this.catalogs.length; i++) {
        if (this.detail_id === this.catalogs[i].detail_type) {
          this.product.category_detail_id = this.catalogs[i].category_detail_id;
        }
        break;
      }
      this.product.supplier_product = this.theSupplier;
      if (this.role === 'ROLE_SUPPLIER') {
        this.product.is_active_product = 0;
      } else {
        this.product.is_active_product = 1;
      }
      await this.addInfoProduct({
        product: this.product
      });

      this.$router.push({ path: 'pd/request-products' });
    },

    async requestColor() {
      const { data, success, message } = await this.getColor();
      // console.log(data);
      // let result = [];
      // _.forEach(data, color =>{
      //   result.push(color.color_name);
      // })
      this.colors = data;
    },

    async requestSize() {
      const { data, success, message } = await this.getSize();
      // let result = [];
      // _.forEach(data, size =>{
      //   result.push(size.size_name);
      // })
      this.sizes = data;
    },

    async requestCategory() {
      const { data, success, message } = await this.getCategory();
      _.forEach(data, item => {
        this.categories.push(item.category_name);
        this.open.push(item);
      });
    },

    async requestCatalog() {
      const { data, success, message } = await this.getNameCatalog({
        detailType: this.detail_id
      });

      this.catalogs = data;
      let attr = [];
      _.forEach(this.catalogs, item => {
        _.forEach(item.catalogs, cata => {
          attr.push(cata.catalog_name);
        });
      });
    },

    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf('.') <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);

        const base = '';
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0];
          // this is an image file that can be sent to server...
          this.product.product_image = this.imageUrl;
        });
      } else {
        this.imageName = '';
        this.imageFile = '';
        this.imageUrl = '';
      }
    },
    pickFileImage(i) {
      this.$refs.inputs[i].click();
    },

    onFileChange(e, i) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.imageDistinct[i] = files[0].name;
      const fr = new FileReader();
      fr.readAsDataURL(files[0]);
      // console.log(this.inputs[i])
      const base = '';
      fr.addEventListener('load', () => {
        this.imageUrlDistinct[i] = fr.result;
        this.imageFileDistinct.push(fr.result);
        // this.imageUrlDistinct=fr.result;
        // this.pd_image = fr.result;
        // _.forEach(this.product.product_detail, list => {
        //   console.log(list);
        //   list.pd_image = fr.result;
        // });
        this.product.image_detail.push(fr.result);
        // this.imageFileDistinct[i] = files[0];
        // console.log(this.imageFileDistinct[i]);
      });
    },

    uploadImageSuccess(formData, index, fileList) {
      let image = [];
      _.forEach(fileList, list => {
        image.push(list.path);
      });
      this.product.path = image;
    },

    beforeRemove(index, done, fileList) {
      // console.log('index',fileList);
      var r = confirm('remove image');
      let image = [];
      if (r == true) {
        done();

        _.forEach(fileList, list => {
          image.push(list.path);
        });
      } else {
      }
      this.product.path = image;
    },

    editImage(formData, index, fileList) {
      let image = [];
      _.forEach(fileList, list => {
        image.push(list.path);
      });
      this.product.path = image;
    },

    addDistinctProduct() {
      this.inputs.push({
        sku: '',
        color_id: '',
        size_id: '',
        quantity: '',
        price: ''
      });
    },
    closeItem(item, i) {
      this.inputs.splice(i, 1);
    }
  }
};
</script>
