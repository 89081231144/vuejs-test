<template>
  <main class="container mt-md-5">

    <!-- Loading spinner -->
    <ui-spinner v-if="isLoading" />

    <template v-else>
      <ui-alert v-if="isCached" type="success" header="Data was cached!">
        <template #default>
          <p>You can clear cache and load data again.</p>
        </template>
        <template #footer>
          <ui-button type="primary" v-if="isCached" @click="resetCache()">
            Clear cache
          </ui-button>
        </template>
      </ui-alert>
      <ui-button type="primary" @click="load()">
        Load Data From Server
      </ui-button>
      <ui-button type="primary" v-if="isCached" @click="useCachsedData()">
        Use Cached Data
      </ui-button>
      <ui-button type="primary" v-if="data.length&&!isCached" @click="setCache()">
        Cache Data
      </ui-button>
      <data-table
        :rows="data"
        :columns="columns"
      />
    </template>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {

  name: 'AppContent',

  data: () => ({
    columns: [
      {
        label: 'ID',
        prop: 'id',
        width: '15%',
      },
      {
        label: 'Date',
        prop: 'date',
        width: '20%',
      },
      {
        label: 'Name',
        prop: 'name',
        width: '30%',
      },
      {
        label: 'Money',
        prop: 'money',
        width: '35%',
      },
    ],
  }),

  computed: {
    ...mapState([
      'isLoading',
      'isCached',
      'data',
    ]),
  },
  created() {
    this.checkCash();
  },
  methods: {
    ...mapActions([
      'load',
      'resetState',
      'resetCache',
      'setCache',
      'checkCash',
      'useCachsedData',
    ]),
  },
};
</script>
