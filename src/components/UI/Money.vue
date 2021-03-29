<template>
  <input
    type="text"
    v-model="valueInputFmt"
    class="ui-money"
  />
</template>

<script>
import Vue from 'vue';

export default {

  name: 'UiMoney',

  props: {
    value: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      valueInput: '',
    };
  },
  computed: {
    valueInputFmt: {
      get() {
        const val = Vue.filter('inputMoney')(this.valueInput);
        return Vue.filter('formatMoney')(val);
      },
      set(v) {
        this.valueInput = v;
      },
    },
  },
};
</script>
