<template>
  <a-table :columns="columns" :data-source="data" @change="onChange"/>
</template>
<script>
import {defineComponent} from 'vue';
import $store from "@/store";

export default defineComponent({
  // props: ['ts_code'],
  setup() {
    const columns = [
      {
        title: '交易日期',
        dataIndex: 'trade_date',
        sorter: {
          compare: (a, b) => a.trade_date - b.trade_date,
          multiple: 1,
        },
      },
      {
        title: '开盘价',
        dataIndex: 'open',
        sorter: {
          compare: (a, b) => a.open - b.open,
          multiple: 2,
        },
      },
      {
        title: '最高价',
        dataIndex: 'high',
        sorter: {
          compare: (a, b) => a.high - b.high,
          multiple: 3,
        },
      },
      {
        title: '最低价',
        dataIndex: 'low',
        sorter: {
          compare: (a, b) => a.low - b.low,
          multiple: 4,
        },
      },
      {
        title: '收盘价',
        dataIndex: 'close',
        sorter: {
          compare: (a, b) => a.close - b.close,
          multiple: 5,
        },
      },
      {
        title: '昨收价',
        dataIndex: 'pre_close',
        sorter: {
          compare: (a, b) => a.pre_close - b.pre_close,
          multiple: 6,
        },
      },
      {
        title: '涨跌额',
        dataIndex: 'change',
        sorter: {
          compare: (a, b) => a.change - b.change,
          multiple: 7,
        },
      },
      {
        title: '涨跌幅',
        dataIndex: 'pct_chg',
        sorter: {
          compare: (a, b) => a.pct_chg - b.pct_chg,
          multiple: 8,
        },
      },
      {
        title: '成交量',
        dataIndex: 'vol',
        sorter: {
          compare: (a, b) => a.vol - b.vol,
          multiple: 9,
        },
      },
      {
        title: '成交额',
        dataIndex: 'amount',
        sorter: {
          compare: (a, b) => a.amount - b.amount,
          multiple: 10,
        },
      },
    ];
    let data = $store.state.stock.stock_daily[$store.state.stock.now_code]
    return {
      data,
      columns,
      onChange: (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      },
    }
  }
});
</script>
<style>
/deep/ .ant-table-body {
  min-height: 500px;
}
</style>
