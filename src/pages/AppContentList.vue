<template>
  <v-app id="inspire">
    <MainMenu />
    <v-main>
      <ContentList />
    </v-main>
    <MainFooter />
  </v-app>
</template>

<script>
import ContentList from "../components/ContentList.vue";
import MainMenu from "../components/MainMenu.vue";
import MainFooter from "../components/MainFooter.vue";
export default {
  components: { ContentList, MainMenu, MainFooter },
  data: () => ({}),
};
</script>
