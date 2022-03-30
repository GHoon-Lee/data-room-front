<template>
  <v-app id="inspire">
    <MainMenu />
    <v-main>
      <PostList />
    </v-main>
    <MainFooter />
  </v-app>
</template>

<script>
import PostList from "../components/PostList.vue";
import MainMenu from "../components/MainMenu.vue";
import MainFooter from "../components/MainFooter.vue";
export default {
  components: { PostList, MainMenu, MainFooter },
  data: () => ({}),
};
</script>
