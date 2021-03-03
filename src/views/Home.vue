<template>
  <div class="home">
    <Map title="Your Position" />
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
