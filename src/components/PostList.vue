<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="posts"
      sort-by="updated_time"
      class="elevation-1"
      :items-per-page="5"
      @click:row="getPost"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title> {{ categoryName }} </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getPosts">Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";
import EventBus from "./event_bus";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "제목", value: "title" },
      { text: "요약", value: "description" },
      { text: "작성/수정일", value: "updated_time" },
      { text: "조회수", value: "views" },
    ],
    categoryName: "",
    posts: [],
    userInfo: {
      id: null,
      division: null,
      username: "Anonymous",
    },
  }),

  created() {
    const params = new URL(location).searchParams;
    var categoryId = params.get("categoryId");
    EventBus.$on("userinfo_change", (val) => {
      this.userInfo = val;
    });
    this.getPosts(categoryId);
  },

  methods: {
    getPosts(categoryId) {
      axios
        .get(`/api/posts?category=${categoryId}`)
        .then((res) => {
          this.posts = res.data["posts"];
          this.categoryName = res.data["category_name"];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPost(item) {
      location.href = `/posts/${item.id}`;
    },
  },
};
</script>

<style scoped>
.v-data-table >>> tbody > tr {
  cursor: pointer;
  font-style: italic;
}
</style>
