<template>
  <div>
    <div @click="$router.go(-1)" class="buttom__back-top cursor-pointer">Back</div>

    <div class="table__wrapper-coin">
      <table class="table__main-coin">
        <thead>
          <tr class="table__head-coin-coin">
            <th>
              <span class="head__title-coin">Exchange</span>
            </th>
            <th>
              <span class="head__title-coin">Pair</span>
            </th>
            <th class="mobile__td-hidden-coin">
              <span class="head__title-coin">Price</span>
            </th>
            <th class="mobile__td-hidden-coin">
              <span class="head__title-coin">Volume(24Hr)</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="value in coin" :key="value.exchangeId">
            <td>{{value.exchangeId}}</td>
            <td>{{value.baseSymbol}}/{{value.quoteSymbol}}</td>
            <td>${{+value.priceQuote}}</td>
            <td>${{+value.volumeUsd24Hr}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      coin: {}
    };
  },
  created() {
    fetch(
      `https://api.coincap.io/v2/markets?baseSymbol=${
        this.$route.params.id
      }&quoteSymbol=usd`
    )
      .then(res => (res.status === 200 ? res : new Error(res)))
      .then(response => response.json())
      .then(response => {
        this.coin = response.data;
      })
      .catch(error => console.log("error", error));
  }
};
</script>
<style lang="scss" scoped>
.buttom__back-top {
  position: fixed;
  top: 10px;
  left: 10px;
  padding: 5px 15px;
  border-radius: 25px;
  background: #aaa;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
}

.buttom__back-top:hover {
  background: rgb(100, 6, 6);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  color: #aaa;
}

.cursor-pointer {
  cursor: pointer;
}

.link__cursor:hover {
  background: #aaa;
  cursor: pointer;
}

.table__wrapper-coin {
  background: #efefef;
  border-radius: 20px;
  padding: 10px;
  margin: 0 auto;
}
.table__main-coin {
  font-size: 14px;
  width: 100%;
  border-spacing: 0;
  th,
  td {
    border-bottom: 1px solid #aaa;
    border-right: 1px solid #aaa;
    padding: 5px;
    &:last-child {
      border-right: none;
    }
  }
}
</style>
