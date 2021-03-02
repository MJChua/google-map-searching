<template>
  <div class="home">
    <Map title="Your Location" />
  </div>
</template>

<script>
import Map from "../components/Map.vue";

export default {
  name: "Home",
  components: {
    Map
  }
};
</script>
