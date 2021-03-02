<template>
  <div class="content">
    <h3 class="content-title">{{ title }}</h3>
    <GMap
      :center="{ lat, lng }"
      :restaurants="restaurants"
      :streetViewControl="false"
      :mapTypeControl="false"
      :fullscreenControl="true"
      :zoomControl="true"
    />
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
      lat: 25.0325917,
      lng: 121.5624999,
      restaurants: []
    };
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
}
</style>
