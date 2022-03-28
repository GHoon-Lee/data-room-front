<template>
  <v-app id="inspire">
    <MainMenu />
    <v-main>
      <Home />
    </v-main>
    <MainFooter />
  </v-app>
</template>
<script>
import Home from "../components/Home.vue";
import MainMenu from "../components/MainMenu.vue";
import MainFooter from "../components/MainFooter.vue";
export default {
  components: { Home, MainMenu, MainFooter },
  data: () => ({}),
};
</script>
