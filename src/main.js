import Vue from 'vue';
import { DateTime } from 'luxon';
import App from './App.vue';
import store from './store';
import './components';

import './assets/sass/index.scss';

const inputMoney = (m) => {
  let i = -1;
  const s = m.toString()
    .replace(',', '.')
    .replace(/[^\d.]/g, '')
    .replace(/^[.]/, '')
    .replace(/[.]/g, (r) => { i += 1; return !i ? r : ''; });
  return s;
};

const formatMoney = (m) => {
  let fm = '';
  if (Number.isInteger(m / 1)) {
    fm = m.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  } else {
    fm = (m / 1).toFixed(2)
      .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  return fm;
};

Vue.filter('formatDate', (dt) => {
  return DateTime.fromISO(dt).toFormat('dd.LL.y');
});

Vue.filter('inputMoney', inputMoney);

Vue.filter('formatMoney', formatMoney);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
