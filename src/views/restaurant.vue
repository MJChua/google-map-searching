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
    <GMap
      :center="{ lat: restaurant.lat, lng: restaurant.lng }"
      :restaurants="[restaurant]"
      :streetViewControl="false"
      :mapTypeControl="true"
      :fullscreenControl="true"
      :zoomControl="true"
      :type="true"
    />
    <div class="content-bot">
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
      geocoder: null,
      hasGeo: false
    };
  },
  mounted() {
    this.initGeocoder();
  },
  methods: {
    initGeocoder() {
      this.geocoder = new window.google.maps.Geocoder();
    },
    geocode() {
      const address = this.restaurant.address;
      this.geocoder.geocode(
        {
          address: address,
          componentRestrictions: {
            country: "TW"
          }
        },
        (results, status) => {
          if (status === "OK") {
            this.restaurant.lat = results[0].geometry.location.lat();
            this.restaurant.lng = results[0].geometry.location.lng();
            this.hasGeo = true;
          } else {
            this.hasGeo = false;
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
    margin 30px auto
    &__card {
      display flex
      justify-content center
    }
  }
  &-bot {
    margin 30px auto
  }
}
</style>
