<template>
  <div class="content">
    <Loading :active.sync="isLoading"></Loading>
    <div class="search-section">
      <div class="search-address">
        <span class="search-address__location">First - Your Location :</span>
        <input
          type="text"
          placeholder="Enter your address"
          v-model="coordinates"
        />
        <button class="btn" @click.prevent="locatorBtnPress">Search</button>
      </div>
      <div class="search-restaurant">
        <span class="search-restaurant__selector">Second - Choose Type :</span>
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
      </div>
    </div>

    <!-- Map Section -->
    <div class="map-wrapper">
      <div id="map" class="map-wrapper__main"></div>
      <div class="map-wrapper__items">
        <div class="item" v-for="place in places" :key="place.id">
          <div class="places-content">
            <div class="places-content__name">{{ place.name }}</div>
            <div class="places-content__locate">{{ place.vicinity }}</div>
          </div>
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
      map: null,
      infowindow: null,
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
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: this.lat, lng: this.lng }
      });
      this.places.forEach(place => {
        const lat = place.geometry.location.lat;
        const lng = place.geometry.location.lng;
        let marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(lat, lng),
          map: this.map
        });
        const infowindow = new window.google.maps.InfoWindow({
          content: `
            <div class="header" style="font-weight: 500">${place.name}</div>
            <br />
            <div>${place.vicinity}</div>
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
  margin 50px auto
  .btn {
    &:hover {
      color red
      background #000
      transition all .3s ease-in
    }
    &:active {
      color yellow
    }
  }
  .search {
    &-section {
      display flex
      flex-direction row
      justify-content center
      margin-bottom 50px
    }
    &-address {
      display flex
      justify-content space-around
      margin-right 50px
      &__location {
        font-weight 600
        opacity .7
      }
      input {
        width 200px
        margin 0 20px
        text-align center
      }
    }
    &-restaurant {
      display flex
      justify-content space-around
      &__selector {
        font-weight 600
        opacity .7
        margin-right 10px
      }
      select {
        width 90px
        margin 0 10px
      }
      .btn {
        margin-left 10px
      }
    }
  }

  // Map Section
  .map-wrapper {
    display flex
    flex-direction row
    justify-content space-between
    &__main {
      width 50%
      height 750px
    }
    &__items {
      width 50%
      height 700px
      border 4px solid #f0f0f0
      padding 20px 5px
      overflow scroll
      .item {
        margin-bottom 20px
        .places-content {
          &__name {
            font-weight 500
            letter-spacing 1px
            overflow hidden
            text-overflow ellipsis
          }
          &__locate {
            letter-spacing 1px
            opacity .6
          }
        }
      }
    }
  }
}
</style>
