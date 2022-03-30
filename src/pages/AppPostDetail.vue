<template>
  <v-app id="inspire">
    <MainMenu />
    <v-main>
      <PostDetail />
    </v-main>
    <MainFooter />
  </v-app>
</template>

<script>
import PostDetail from "../components/PostDetail.vue";
import MainMenu from "../components/MainMenu.vue";
import MainFooter from "../components/MainFooter.vue";
export default {
  components: { PostDetail, MainMenu, MainFooter },
  data: () => ({}),
};
</script>
