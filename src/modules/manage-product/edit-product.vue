<template>
  <v-dialog v-model="dialog" width="30%" grid-list-md text-xs-center>
    <v-form ref="formCd">
      <v-card flat class="home-app-wrapper">
        <v-toolbar dark color="primary" tabs>
          <v-toolbar-title class="font-weight-regular"
          >Duyệt sản phẩm</v-toolbar-title
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
              <v-select
                v-model="chose_product"
                item-text="text"
                item-value="is_active"
                :items="list_size"
                chips
              >
                <template slot="prepend">
                  <v-chip
                    class="mr-0 subheading font-weight-regular"
                    style="background-color:white"
                  >Duyệt sản phẩm:</v-chip
                  >
                </template>
              </v-select>
            </v-flex>
          </v-layout>
          <v-layout row align-center fill-height>
            <v-flex md12>
              <v-btn flat class="btn_ui_blue" color="white" @click="handleAgree"
              >Đồng Ý</v-btn
              >
              <v-btn
                flat
                class="btn_ui_add icon"
                color="white"
                @click="handleCancel"
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
      isAgree: false,
      status: '',
      chose_product: '',
      list_size: [
        { text: 'Cho phép đăng bán', is_active: 1 },
        { text: 'Từ chối', is_active: 2 }
      ]
    };
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

  created() {
    this.dialog = this.show;
  },

  methods: {
    async loadPopup() {
      this.status = this.parameter.data;
      this.chose_product = this.list_size[0];
    },

    emitCloseState() {
      this.$emit('close', this.isAgree);
      this.dialog = false;
    },
    handleAgree() {
      this.$emit('result', this.chose_product, this.status.product_id);
      this.dialog = false;
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
