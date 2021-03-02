<template>
  <div class="main">
    <label>
      {{ title }}
      <br />
      <GmapAutocomplete @place_changed="setPlace" />
      <button @click="usePlace">Add</button>
    </label>

    <br />

    <GmapMap :zoom="1" :center="{ lat: 0, lng: 0 }">
      <GmapMarker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
      />
      <GmapMarker
        v-if="this.place"
        label="*"
        :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng()
        }"
      />
    </GmapMap>

    <br />

    <!-- <div id="map" class="main-content"></div> -->
  </div>
</template>

<script>
export default {
  name: "Main",
  props: {
    title: String
  },
  data() {
    return {
      markers: [],
      place: null

      // map: null,
      // marker: null,
      // lat: 25.0325917,
      // lng: 121.5624999
    };
  },
  description: "Autocomplete Example (#164)",
  mounted() {
    // this.initMap();
    // this.setMarker();
  },
  methods: {
    // initMap() {
    //   this.map = new window.google.maps.Map(document.getElementById("map"), {
    //     center: { lat: this.lat, lng: this.lng },
    //     zoom: 15,
    //     maxZoom: 20,
    //     minZoom: 3,
    //     streetViewControl: false,
    //     mapTypeControl: false
    //   });
    // },
    // setMarker() {
    //   this.marker = new window.google.maps.Marker({
    //     position: { lat: this.lat, lng: this.lng },
    //     map: this.map
    //   });
    // },
    setDescription(description) {
      this.description = description;
    },
    setPlace(place) {
      this.place = place;
    },
    usePlace() {
      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng()
          }
        });
        this.place = null;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.main {
  &-content {
    width 100%
    height 500px
  }
  .vue-map-container {
    width 100%
    height 500px
  }
}
</style>
