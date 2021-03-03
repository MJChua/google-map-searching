<template>
  <div class="content">
    <h4 class="content-title">{{ title }}</h4>
    <div class="content-top">
      <div class="content-top__card">
        <form class="card-content" @submit.prevent="geocode">
          <h5 class="center">餐廳資訊</h5>
          <div class="row">
            <div class="input-field col s12">
              <label for="name">餐廳名稱</label>
              <input type="text" id="name" v-model="restaurant.name" />
            </div>
            <div class="input-field col s12">
              <label for="address">餐廳地址</label>
              <input type="text" id="address" v-model="restaurant.address" />
            </div>
            <!--顯示錯誤訊息-->
            <p v-if="errormsg" class="center red-text">{{ errormsg }}</p>
            <div class="input-field col s12 center">
              <button type="submit" class="btn waves-light waves-effect">
                submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="content-bot">
      <GMap
        :center="{ lat: restaurant.lat, lng: restaurant.lng }"
        :restaurants="[restaurant]"
        :streetViewControl="false"
        :mapTypeControl="false"
        :fullscreenControl="true"
        :zoomControl="true"
      />
      <div class="card col s6 offset-s3" v-if="hasGeo">
        <div class="card-content">
          <h5 class="center">確認資訊</h5>
        </div>
        <div class="card-action">
          <p class="grey-text">餐廳名稱：{{ restaurant.name }}</p>
          <p class="grey-text">餐廳緯度: {{ restaurant.lat }}</p>
          <p class="grey-text">餐廳經度: {{ restaurant.lng }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GMap from "../components/GMap";

export default {
  name: "Restaurant",
  props: {
    title: String
  },
  components: {
    GMap
  },
  data() {
    return {
      restaurant: {
        address: "",
        name: "",
        lat: 25.0325917,
        lng: 121.5624999
      },
      errormsg: null,
      // 存放 geocoder 物件實例
      geocoder: null,
      // 存放目前是否已獲得座標的狀態
      hasGeo: false
    };
  },
  mounted() {
    this.initGeocoder();
  },
  methods: {
    // 透過 google.maps.Geocoder() 物件建構子建立一個 geocoder 物件實例
    initGeocoder() {
      this.geocoder = new window.google.maps.Geocoder();
    },
    geocode() {
      // 取得餐廳地址
      const address = this.restaurant.address;
      this.geocoder.geocode(
        // GeocoderRequest 物件: 帶入要轉換的地址與相關設定
        {
          // 地址
          address: address,
          // 限制轉換的結果必須是在台灣的範圍
          componentRestrictions: {
            country: "TW"
          }
        },
        // 轉換完成後呼叫的 callback 函式
        (results, status) => {
          if (status === "OK") {
            // 當轉換成功時，將第一筆結果的經緯度存取起來
            this.restaurant.lat = results[0].geometry.location.lat();
            this.restaurant.lng = results[0].geometry.location.lng();
            // 更新狀態為已經獲得經緯度
            this.hasGeo = true;
          } else {
            // 更新狀態為未經獲得經緯度
            this.hasGeo = false;
            // 當轉換失敗時，顯示錯誤原因
            this.errormsg = status;
          }
        }
      );
    }
  }
};
</script>

<style scoped lang="stylus">
.content {
  &-title {
    font-size 28px
    font-weight 600
    letter-spacing .5px
  }
  &-top {
    margin 50px auto
  }
  &-bot {
    margin 50px auto
  }
}
</style>
