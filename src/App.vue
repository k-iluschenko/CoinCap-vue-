<template>
  <div>
    <div class="table__wrapper">
      <div class="table__scroll">
        <table class="table__main">
          <thead>
            <tr class="table__head">
              <th>
                <span class="head__title">{{name}}</span>
              </th>
              <th>
                <span class="head__title">{{priceTitle}}</span>
              </th>
              <th class="mobile__td-hidden">
                <span class="head__title">{{marketCap}}</span>
              </th>
              <th class="mobile__td-hidden">
                <span class="head__title">{{volue24h}}</span>
              </th>
            </tr>
          </thead>
          <tbody class="table__body">
            <template v-for="coin in sortCoins">
              <router-link
                :to="{name:'coin', params:{id: coin.symbol, name: coin.id}}"
                tag="tr"
                :key="coin.id"
                :coin="coin"
                class="link__cursor"
              >
                <td>{{coin.name}}</td>
                <td>{{ setPrice(coin) }}</td>
                <td class="mobile__td-hidden">{{+coin.marketCapUsd}}</td>
                <td class="mobile__td-hidden">{{+coin.volumeUsd24Hr}}</td>
              </router-link>
            </template>
            <!--            
            <tr v-for="coin in this.sortCoins" v-bind:key="coin.id">
              <td>{{coin.name}}</td>
              <td>{{ setPrice(coin) }}</td>
              <td class="mobile__td-hidden">{{+coin.marketCapUsd}}</td>
              <td class="mobile__td-hidden">{{+coin.volumeUsd24Hr}}</td>
            </tr>-->
          </tbody>
        </table>
      </div>
    </div>
    <div class="row__liner">
      <h2>компонент</h2>
    </div>
    <div class="table__wrapper">
      <div class="table__scroll">
        <table class="table__main">
          <thead>
            <tr class="table__head">
              <th>
                <span class="head__title">{{name}}</span>
              </th>
              <th>
                <span class="head__title">{{priceTitle}}</span>
              </th>
              <th class="mobile__td-hidden">
                <span class="head__title">{{marketCap}}</span>
              </th>
              <th class="mobile__td-hidden">
                <span class="head__title">{{volue24h}}</span>
              </th>
            </tr>
          </thead>
          <tbody class="table__body">
            <appCoins v-for="coin in sortCoins" v-bind:key="coin.id" v-bind:coin="coin"/>
          </tbody>
        </table>
      </div>
    </div>
    <router-link to="/coin">coin</router-link>
  </div>
</template>

<script>
import Coins from "./Coins.vue";
export default {
  name: "app",
  data() {
    console.log("data");
    return {
      name: "Наименование",
      priceTitle: "Стоимость",
      marketCap: "Рыночная капитализация",
      volue24h: "Суточный объем",
      allCoins: [],
      sortCoins: []
    };
  },

  created() {
    console.log("created");
    async function getCoinsInfo() {
      try {
        let response = await fetch(
          "https://api.coincap.io/v2/assets?limit=2000"
          //"http://192.168.11.121:5001/api/Currency"
        );
        let data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        throw new Error("не удалось получить данные");
      }
    }

    (async () => {
      try {
        let coin = await getCoinsInfo();
        console.log(this);
        await (this.allCoins = coin.data);
        await this.sort(this.allCoins);
      } catch (error) {
        console.error(error);
      }
    })();
    // fetch("https://api.coincap.io/v2/assets?limit=2000")
    //   .then(res => (res.status === 200 ? res : new Error(res)))
    //   .then(response => response.json())
    //   .then(response => {
    //     this.allCoins = response.data;
    //   })
    //   .then(response => {
    //     this.sort(this.allCoins);
    //   })
    //   .catch(error => console.log("error", error));
  },

  beforeCreate() {
    console.log("beforeCreate");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },

  methods: {
    sort(arr) {
      this.sortCoins = arr.sort((a, b) => {
        if (+a.marketCapUsd < +b.marketCapUsd) {
          return 1;
        }
        if (+a.marketCapUsd > +b.marketCapUsd) {
          return -1;
        }
        return 0;
      });
      this.sortCoins.splice(15);
    },
    setPrice(coin) {
      console.log(coin);
      const price = +coin.priceUsd;
      return price.toFixed(6);
    }
  },
  components: {
    appCoins: Coins
  }
};
</script>

<style lang="scss">
.link__cursor:hover {
  background: #aaa;
  cursor: pointer;
}

.container__wrapper {
  position: relative;
  width: 100%;
  margin: 0 200px;
}
.row__liner {
  min-height: 20px;
  text-align: center;
}
.body__wrapper {
  color: #000;
  height: 100vh;
  display: flex;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
  padding: 0 20px;

  background: rgba(45, 176, 224, 1);
  background: -moz-linear-gradient(
    45deg,
    rgba(45, 176, 224, 1) 0%,
    rgba(96, 40, 168, 1) 100%
  );
  background: -webkit-gradient(
    left bottom,
    right top,
    color-stop(0%, rgba(45, 176, 224, 1)),
    color-stop(100%, rgba(96, 40, 168, 1))
  );
  background: -webkit-linear-gradient(
    45deg,
    rgba(45, 176, 224, 1) 0%,
    rgba(96, 40, 168, 1) 100%
  );
  background: -o-linear-gradient(
    45deg,
    rgba(45, 176, 224, 1) 0%,
    rgba(96, 40, 168, 1) 100%
  );
  background: -ms-linear-gradient(
    45deg,
    rgba(45, 176, 224, 1) 0%,
    rgba(96, 40, 168, 1) 100%
  );
  background: linear-gradient(
    45deg,
    rgba(45, 176, 224, 1) 0%,
    rgba(96, 40, 168, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2db0e0', endColorstr='#6028a8', GradientType=9 );
}

.table__wrapper {
  background: #efefef;
  border-radius: 20px;
  padding: 10px;
}

.table__body {
  width: 100%;
  display: block;
  height: 30vh;
  overflow: auto;
  visibility: hidden;
  &:hover {
    visibility: visible;
  }
}

.table__main {
  font-size: 14px;
  width: 100%;
  visibility: visible;
  border-spacing: 0;
  tr {
    display: flex;
    width: 100%;
    visibility: visible;
    flex-wrap: nowrap;
  }
  th,
  td {
    border-bottom: 1px solid #aaa;
    border-right: 1px solid #aaa;
    padding: 5px;
    width: 25%;
    overflow: hidden;
    &:last-child {
      border-right: none;
    }
  }
}

.table__head {
  padding-right: 15px;
  overflow: auto;
}

@media (max-width: 992px) {
  .table__wrapper {
    margin: 0 100px;
  }
  .container__wrapper {
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .table__wrapper {
    margin: 0 auto;
  }
  .table__main {
    font-size: 12px;
  }
}

@media (max-width: 576px) {
  .mobile__td-hidden {
    display: none;
  }
  .table__main {
    th,
    td {
      width: 50%;
      &:nth-child(2) {
        border-right: none;
      }
    }
  }
  .table__head {
    text-align: center;
  }
  .table__main {
    font-size: 12px;
  }
}
</style>