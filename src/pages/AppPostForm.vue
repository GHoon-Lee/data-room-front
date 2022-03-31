<template>
  <v-app id="inspire">
    <MainMenu />
    <v-main>
      <PostForm />
    </v-main>
    <MainFooter />
  </v-app>
</template>

<script>
import PostForm from "../components/PostForm.vue";
import MainMenu from "../components/MainMenu.vue";
import MainFooter from "../components/MainFooter.vue";
export default {
  components: { PostForm, MainMenu, MainFooter },
  data: () => ({}),
};
</script>
