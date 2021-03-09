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
          <div class="meta">{{ place.vicinity }}</div>
          <br />
          <div class="header">{{ place.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import axios from "axios";

export default {
  name: "Nearby",
  components: {
    Loading
  },
  data() {
    return {
      lat: 0,
      lng: 0,
      icon: "",
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
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        } else {
          alert("Error Position");
        }
        this.isLoading = false;
      });
    },
    findCloseByBtnPress() {
      const URL = `/search-api?location=${this.lat},${this.lng}&type=${
        this.type
      }&radius=${this.radius *
        1000}&key=AIzaSyCd6kNCPNNnVZnd45Es3WTY8xfzeYdhUQQ`;
      axios
        .get(URL)
        .then(response => {
          this.icon = response.data.results;
          this.places = response.data.results;
          this.addLocationsToGoogleMaps();
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    addLocationsToGoogleMaps() {
      const map = new window.google.maps.Map(this.$refs["map"], {
        zoom: 15,
        center: { lat: this.lat, lng: this.lng },
        mapTypeId: window.google.maps.mapTypeId.ROADMAP
      });
      this.places.forEach(place => {
        const lat = place.geometry.location.lat;
        const lng = place.geometry.location.lng;
        let marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(lat, lng),
          map: map
        });
        const infowindow = new window.google.maps.event.addListener(
          marker,
          "click",
          () => {
            infowindow.setContent(
              `
            <div class="header">${place.map}
              <p>${place.vicinity}</p>
            </div>            
            `
            ),
              infowindow.open(map, marker);
          }
        );
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
