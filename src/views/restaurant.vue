<template>
  <div class="content">
    <h4 class="content-title">{{ title }}</h4>
    <div class="content-top__section">
      <form class="card-content" @submit.prevent="geocode">
        <h4 class="card-title">餐廳資訊</h4>
        <div class="row">
          <div class="input-field">
            <label for="name">餐廳名稱</label>
            <input type="text" id="name" v-model="restaurant.name" />
          </div>
          <div class="input-field">
            <label for="address">餐廳地址</label>
            <input type="text" id="address" v-model="restaurant.address" />
          </div>

          <p v-if="errormsg" class="center">{{ errormsg }}</p>
          <div class="input-field">
            <button type="submit" class="btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="content-bot__section">
      <GMap
        :center="{ lat: restaurant.lat, lng: restaurant.lng }"
        :restaurants="[restaurant]"
        :streetViewControl="false"
        :mapTypeControl="true"
        :fullscreenControl="true"
        :zoomControl="true"
        class="google-map"
      />
      <div class="card" v-if="hasGeo">
        <div class="card-content">
          <h3 class="card-title">確認資訊</h3>
        </div>
        <div class="card-action">
          <p>餐廳名稱: {{ restaurant.name }}</p>
          <p>餐廳緯度: {{ restaurant.lat }}</p>
          <p>餐廳經度: {{ restaurant.lng }}</p>
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
  &-top__section {
    display flex
    justify-content center
    margin 0 auto
    .card {
      &-title {
        font-size 20px
        font-weight 600
        letter-spacing .5px
      }
    }
  }
  &-bot__section {
    width 100%
    display flex
    flex-direction row
    justify-content space-between
    margin 30px auto
    .google-map {
      width 100%
    }
    .card {
      width 100%
      display flex
      flex-direction column
      justify-content center
    }
  }
}
</style>
