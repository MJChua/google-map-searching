<template>
  <div class="content">
    <Loading :active.sync="isLoading"></Loading>
    <input type="text" placeholder="Enter your address" v-model="coordinates" />
    <button class="btn" @click.prevent="locatorBtnPress">Search</button>
    <select v-model="type">
      <option value="restaurant">Restaurant</option>
    </select>
    <select v-model="radius">
      <option value="5">5 KM</option>
      <option value="10">10 KM</option>
      <option value="15">15 KM</option>
      <option value="20">20 KM</option>
    </select>
    <button class="btn" @click.prevent="findCloseByBtnPress">Press</button>
    <div class="items">
      <div class="item" v-for="place in places" :key="place.id">
        <div class="places-content">
          <div class="header">{{ place.name }}</div>
          <div class="meta">{{ place.vicinity }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import * as axios from "axios";

export default {
  name: "Restaurant-Test",
  components: {
    Loading
  },
  data() {
    return {
      lat: 0,
      lng: 0,
      type: "",
      radius: "",
      places: [],
      isLoading: false
    };
  },
  computed: {
    coordinates() {
      return `${this.lat}, ${this.lng}`;
    }
  },
  methods: {
    locatorBtnPress() {
      this.isLoading = true;
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.isLoading = false;
      });
    },
    findCloseByBtnPress() {
      const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/js?location=${
        this.lat
      },${this.lng}&type=${this.type}&radius=${this.radius *
        1000}&key=[AIzaSyCd6kNCPNNnVZnd45Es3WTY8xfzeYdhUQQ]`;
      axios
        .get(URL)
        .then(response => {
          this.places = response.data.results;
          this.addLocationsToGoogleMaps();
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>

<style scoped lang="stylus">
.content {
  margin 50px auto
}
</style>
