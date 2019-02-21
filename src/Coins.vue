<template>
  <tr>
    <td>{{name}}</td>
    <td>{{price.toFixed(6)}}</td>
    <td class="mobile__td-hidden">{{marketCap}}</td>
    <td class="mobile__td-hidden">{{volume}}</td>
  </tr>
</template>
<script>
export default {
  props: {
    coin: Object
  },
  data() {
    return {
      name: this.coin.name,
      price: +this.coin.priceUsd,
      marketCap: +this.coin.marketCapUsd,
      volume: this.coin.volumeUsd24Hr
    };
  }
};
</script>



