<template>
  <div class="map">
    <h3 class="map-title">{{ title }}</h3>
    <Loading :active.sync="isLoading"></Loading>
    <div id="map" class="map-content"></div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Map",
  props: {
    title: String
  },
  components: {
    Loading
  },
  data() {
    return {
      map: null,
      marker: null,
      lat: 25.0325917,
      lng: 121.5624999,
      isLoading: false
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.isLoading = true;
      navigator.geolocation.getCurrentPosition(position => {
        if (position) {
          console.log(position);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        } else {
          alert("Position Is Available");
        }

        this.map = new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: this.lat, lng: this.lng },
          zoom: 15,
          maxZoom: 20,
          minZoom: 3,
          streetViewControl: true, //街景小人
          mapTypeControl: true //切換地圖樣式
        });
        this.marker = new window.google.maps.Marker({
          position: { lat: this.lat, lng: this.lng },
          map: this.map
        });
        this.isLoading = false;
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.map {
  &-title {
    font-size 28px
    font-weight 600
    letter-spacing .5px
  }
  &-content {
    width 100%
    height 500px
  }

}
</style>
