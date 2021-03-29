<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money v-model="moneyFilter"/>
    </div>
    <!-- Your component code here -->
    <div v-for="(tr, index) in tableRows" :key="index" class="data-table__row">
      <div v-for="(tc, index) in tableColumns" :key="index" class="data-table__ceil">
        <div class="data-table__row_head">
          {{tc}}
        </div>
        <div v-if="tc in tr">
          <span v-if="tc === 'date'">{{ tr[tc] | formatDate }}</span>
          <span v-else-if="tc === 'money'">{{ tr[tc] | formatMoney }}</span>
          <span v-else>{{ tr[tc] }}</span>
        </div>
        <div v-else><span></span></div>
      </div>
    </div>
    <div class="data-table__paginator">
      <ui-pagination
        v-model="page"
        :pages="pageCount"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  name: 'DataTable',

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
    moneyFilter: 0,
  }),

  computed: {
    ...mapGetters(['getData']),
    pageCount() {
      return Math.ceil(this.rows.length / this.pageSize);
    },
    tableColumns() {
      return [...new Set(this.tableRows.map((el) => Object.keys(el)).flat(1))];
    },
    tableRows() {
      return [...this.getData]
        .slice((this.page - 1) * this.pageSize, this.pageSize * this.page);
    },
  },
};
</script>
<style lang="scss">
@mixin alt-border {
  box-shadow:
    1px 0 0 0 black,
    0 1px 0 0 black,
    1px 1px 0 0 black,
    1px 0 0 0 black inset,
    0 1px 0 0 black inset;
}
  .data-table {

    &__filter,&__paginator {
      margin: auto;
      padding: .2em;
    }

    &__row {
      display: flex;
      &_head {
        display: none;
        background-color: lightgray;
        font-weight: bold;
      }
      &:nth-child(2) &_head{
        display: block;
      }
    }

    &__ceil {
      flex: 1;
      padding: .2em;
      text-align: center;
      @include alt-border;
    }
    @media screen and (max-width: 768px) {
      &__row {
        @include alt-border;
        display: block;
        margin-bottom: .8em;
        &_head {
          display: block;
          background-color: unset;
        }
      }
      &__ceil {
        text-align: left;
        margin-bottom: .2em;
        box-shadow: unset;
      }
    }
  }
</style>
