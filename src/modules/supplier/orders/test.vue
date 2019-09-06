<template>
  <div>
    <h1 class="asd">{{ name }}</h1>
    <input v-model="name" />
  </div>
</template>

<script>
export default {
  props: {},

  data() {
    return {
      welcome: 'Welcome to training class',
      person: {
        first_name: 'DOAN',
        last_name: 'CHI'
      }
    };
  },

  computed: {
    name: {
      get() {
        return this.person.first_name + ' ' + this.person.last_name;
      },
      set(val) {
        this.person.first_name = val.split(' ')[0];
        this.person.last_name = val.split(' ')[1];
      }
    }
  },

  beforeCreate() {
    console.log(this);
    document.getElementsByClassName('asd');
  },

  created() {
    console.log(this);
    document.getElementsByClassName('asd');
  },

  beforeMount() {
    console.log(this);
    document.getElementsByClassName('asd');
  },

  // render lên dom (dùng xử lý class, id)
  mounted() {
    console.log(this);
    document.getElementsByClassName('asd');
  },

  beforeUpdate() {},

  updated() {},

  beforeDestroy() {},

  destroy() {}
};
</script>

<style></style>
