<template>
  <div>
    <v-toolbar class="custom-style" color="#337ab7" fixed dark app height="50">
      <v-toolbar-title class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="handleDrawerToggle" />
      </v-toolbar-title>
      <v-spacer />
      <v-icon>person</v-icon> {{ me.username }}
      <v-btn icon @click="handleLogoutClick()">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <create-supplier :show="showPopup" />
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapState, mapGetters } from 'vuex';
import CreateSupplier from 'modules/login/confirm-info';

export default {
  name: 'app-toolbar',

  components: {
    CreateSupplier
  },

  data() {
    return {
      showPopup: true
    };
  },

  computed: {
    ...mapState('global', ['drawerToggled']),
    ...mapGetters('login', ['me']),

    toolbarColor() {
      return this.$vuetify.options.extra.mainNav;
    }
  },

  methods: {
    ...mapActions('login', ['logout']),
    ...mapActions('global', ['toggleDrawer']),

    handleDrawerToggle() {
      this.toggleDrawer(!this.drawerToggled);
    },

    handleLogoutClick() {
      this.logout().then(() => this.$router.push({ path: '/login' }));
    },

    upper(val) {
      return _.toUpper(val);
    }
  }
};
</script>

<style>
.custom-style.v-toolbar .v-toolbar__content {
  padding-left: 0;
  padding-right: 15px;
}

.personal {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0 20px;
  cursor: pointer;
  margin: 0 5px 0 0;
}

.personal:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

.personal > img {
  float: left;
  height: 26px;
  margin: 12px auto;
}

.personal > div {
  float: right;
  margin: 14px 0 14px 14px;
  font-weight: 600;
}
</style>
