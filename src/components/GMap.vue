<template>
  <div class="content">
    <Loading :active.sync="isLoading" :is-full-page="fullPage" />
    <div id="map" class="content__map"></div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "GMap",
  components: {
    Loading
  },
  props: {
    title: String,
    center: {
      type: Object,
      default: () => ({ lat: 25.0325917, lng: 121.5624999 })
    },
    zoom: {
      type: Number,
      default: 14
    },
    streetViewControl: {
      type: Boolean,
      default: true
    },
    mapTypeControl: {
      type: Boolean,
      default: true
    },
    fullscreenControl: {
      type: Boolean,
      default: true
    },
    zoomControl: {
      type: Boolean,
      default: true
    },
    restaurants: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      map: null,
      infowindow: null,
      markers: [],
      isLoading: false,
      fullPage: true
    };
  },
  watch: {
    center() {
      this.resetMap();
      this.setMarker();
    }
  },
  mounted() {
    this.initMap();
    this.setMarker();
  },
  methods: {
    initMap() {
      this.isLoading = true;
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        center: this.center,
        zoom: this.zoom,
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: this.streetViewControl,
        mapTypeControl: this.mapTypeControl,
        fullscreenControl: this.fullscreenControl,
        zoomControl: this.zoomControl
      });
      setTimeout(() => {
        this.isLoading = false;
      }, 100);
    },
    resetMap() {
      //panTo 滑順移動
      this.map.panTo({ lat: this.center.lat, lng: this.center.lng });
    },
    clearMarkers() {
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];
    },
    setMarker() {
      //clear existing marker
      this.clearMarkers();

      this.restaurants.forEach(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: this.location.lat, lng: this.location.lng },
          map: this.map
        });
        this.markers.push(marker);

        const infowindow = new window.google.maps.InfoWindow({
          content: `
            <div id="content">
              <p id="firstHeading" class="firstHeading"> ${location.name} </p>
            </div>
          `,
          maxWidth: 200
        });

        marker.addListener("click", () => {
          if (this.infowindow) this.infowindow.close();
          infowindow.open(this.map, marker);
          this.infowindow = infowindow;
        });
      });
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
  &__map {
    width 100%
    height 650px
  }
}
</style>
