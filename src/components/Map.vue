<template>
  <div class="map">
    <h3 class="map-title">{{ title }}</h3>
    <div id="map" class="map-content"></div>
  </div>
</template>

<script>
export default {
  name: "Map",
  props: {
    title: String
  },
  data() {
    return {
      map: null,
      marker: null,
      lat: 25.0325917,
      lng: 121.5624999
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

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
