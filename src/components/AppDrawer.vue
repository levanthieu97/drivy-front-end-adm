<template>
  <v-navigation-drawer
    id="appDrawer"
    v-model="drawer"
    :mini-variant.sync="mini"
    :dark="$vuetify.dark"
    fixed
    app
    width="260"
  >
    <v-toolbar color="#337ab7" dark height="50">
      <img
        id="logo"
        src="~assets/images/logo_store.png"
        height="50"
        alt="TP Shop"
      />
    </v-toolbar>

    <vue-perfect-scrollbar
      :settings="scrollSettings"
      class="drawer-menu--scroll my_style"
    >
      <v-list dense expand>
        <template v-for="(item, i) in supplier_menus">
          <!--group with subitems-->
          <v-list-group
            v-if="item.items"
            :key="item.name"
            :value="computeGroupActive(item)"
            :class="[$route.meta.group == item.group ? 'active' : '']"
            :group="item.group"
            :prepend-icon="item.icon"
            no-action="no-action"
          >
            <v-list-tile slot="activator" ripple="ripple">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <template v-for="(subItem, i) in item.items">
              <!--child item-->
              <v-list-tile
                :key="i"
                :to="genChildTarget(item, subItem)"
                :href="subItem.href"
                :disabled="subItem.disabled"
                :target="subItem.target"
                ripple="ripple"
              >
                <v-icon class="sub_icon">panorama_fish_eye</v-icon>
                <v-list-tile-content>
                  <v-list-tile-title>
                    <span>{{ subItem.title }}</span>
                  </v-list-tile-title>
                </v-list-tile-content>
                <!-- <v-circle class="white--text pa-0 circle-pill" v-if="subItem.badge" color="red" disabled="disabled">{{ subItem.badge }}</v-circle> -->
                <v-list-tile-action v-if="subItem.action">
                  <v-icon :class="[subItem.actionClass || 'success--text']">
                    {{ subItem.action }}
                  </v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list-group>
          <v-subheader v-else-if="item.header" :key="i">
            {{ item.header }}
          </v-subheader>
          <v-divider v-else-if="item.divider" :key="i" />
          <!--top-level link-->
          <v-list-tile
            v-else
            :key="item.name"
            :to="!item.href ? { name: item.name } : null"
            :href="item.href"
            :class="[
              'simple-list-item',
              $route.name == item.name ? 'active' : ''
            ]"
            :disabled="item.disabled"
            :target="item.target"
            ripple="ripple"
            rel="noopener"
          >
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <!-- <v-circle class="white--text pa-0 chip--x-small" v-if="item.badge" :color="item.color || 'primary'" disabled="disabled">{{ item.badge }}</v-circle> -->
            <v-list-tile-action v-if="item.subAction">
              <v-icon class="success--text">{{ item.subAction }}</v-icon>
            </v-list-tile-action>
            <!-- <v-circle class="caption blue lighten-2 white--text mx-0" v-else-if="item.chip" label="label" small="small">{{ item.chip }}</v-circle> -->
          </v-list-tile>
        </template>
      </v-list>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>
<script>
import _ from 'lodash';
import { mapState, mapActions, mapGetters } from 'vuex';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export default {
  name: 'app-drawer',

  components: {
    VuePerfectScrollbar
  },

  props: {
    expanded: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    mini: false,
    scrollSettings: {
      maxScrollbarLength: 160
    }
  }),

  computed: {
    ...mapGetters('login', ['role']),
    ...mapState('login', ['menus']),
    ...mapState('global', ['drawerToggled']),

    sideToolbarColor() {
      return this.$vuetify.options.extra.sideNav;
    },

    drawer: {
      get() {
        return this.drawerToggled;
      },

      set(val) {
        this.toggleDrawer(val);
      }
    },
    supplier_menus() {
      let sup_menus = [];
      _.forEach(this.menus, menu => {
        sup_menus = _.concat(sup_menus, this.readMenu(menu));
      });
      return sup_menus;
    }
  },

  methods: {
    ...mapActions('global', ['toggleDrawer']),

    genChildTarget(item, subItem) {
      if (subItem.href) return;
      if (subItem.component) {
        return {
          name: subItem.component
        };
      }
      return { name: `${item.group}/${subItem.name}` };
    },

    computeGroupActive(item) {
      return item.group == this.$route.meta.group;
    },

    readMenu(menu) {
      let safeMenu = _.cloneDeep(menu);
      //Main menu
      if (_.has(safeMenu, 'name')) {
        if (safeMenu.name == 'Dashboard') {
          return [safeMenu];
        }

        if (!_.has(safeMenu, 'items') || safeMenu.items.length == 0) {
          return [];
        }
        let subMenu = [];
        _.forEach(safeMenu.items, item => {
          if (this.role === 'ROLE_ADMIN') {
            if (_.has(item, 'component')) {
              subMenu.push(item);
            }
          } else {
            if (item.title === 'Duyệt sản phẩm') {
            } else {
              if (_.has(item, 'component')) {
                subMenu.push(item);
              }
            }
          }
        });
        if (subMenu.length > 0) {
          safeMenu.items = subMenu;
          return [safeMenu];
        }
      }
      return [safeMenu];
    }
  }
};
</script>

<style lang="stylus">
// @import '../../node_modules/vuetify/src/stylus/settings/_elevations.styl';
#appDrawer {
  overflow: hidden;
  background-color: #222d32;

  .drawer-menu--scroll {
    height: calc(100vh - 48px);
    overflow-x: hidden;
    overflow-y: auto;
  }
}

#logo {
  filter: brightness(0) invert(1);
  -webkit-filter: brightness(0) invert(1);
  margin: 0 auto;
}
</style>
