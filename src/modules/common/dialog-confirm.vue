<template>
  <v-dialog v-model="dialog" width="30%" grid-list-md text-xs-center>
    <v-form ref="formCd">
      <v-card flat class="home-app-wrapper">
        <v-toolbar dark color="primary" tabs>
          <v-toolbar-title class="font-weight-regular">
            {{ parameter.title }}
          </v-toolbar-title>
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
              <span class="subheading">{{ parameter.message }}</span>
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
      isAgree: false
    };
  },
  watch: {
    show(value) {
      this.dialog = value;
    }
  },

  created() {
    this.dialog = this.show;
  },

  methods: {
    emitCloseState() {
      this.$emit('close', this.isAgree);
      this.dialog = false;
    },
    handleAgree() {
      this.isAgree = true;
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
