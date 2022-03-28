<template>
  <v-app id="inspire">
    <MainMenu />
    <v-main>
      <ContentDetail />
    </v-main>
    <MainFooter />
  </v-app>
</template>

<script>
import ContentDetail from "../components/ContentDetail.vue";
import MainMenu from "../components/MainMenu.vue";
import MainFooter from "../components/MainFooter.vue";
export default {
  components: { ContentDetail, MainMenu, MainFooter },
  data: () => ({}),
};
</script>
