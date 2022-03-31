<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" lg="10">
        <h1>{{ post.title }}</h1>
        <p>
          {{ post.updated_time }}, {{ post.user_name }}&nbsp;&nbsp;<u
            @click="getPostForm(post.id)"
            v-if="post.user_name === userInfo.username"
            >수정</u
          >
        </p>
      </v-col>
    </v-row>
    <v-row align="start" justify="center">
      <v-col cols="12" sm="12" lg="10">
        <v-card class="pa-2" outlined tile>
          <p style="white-space: pre-wrap">{{ post.content }}</p>
          <!-- <br />
          <br />
          <br /> -->
          <!-- <a href="#" @click="getFile">{{ post.file_name }}</a> -->
          <!-- <a @click="getFile" download> -->
          <!-- <span style="margin-right: 10px">{{ post.file_name }}</span> -->
          <!-- <v-btn @click="getFile">
              <v-icon>download icon</v-icon>
            </v-btn> -->
          <!-- </a> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import EventBus from "./event_bus";
export default {
  data: () => ({
    post: {},
    userInfo: {
      id: null,
      division: null,
      username: "Anonymous",
    },
  }),
  created() {
    EventBus.$on("userinfo_change", (val) => {
      console.log("wrberguirgeiu");
      this.userInfo = val;
    });
    const postId = location.pathname.split("/")[2];
    this.getPost(postId);
  },
  methods: {
    getPost(postId) {
      axios
        .get(`/api/posts/${postId}`)
        .then((res) => {
          console.log(res.data);
          this.post = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPostForm(id) {
      location.href = `/form/post?type=edit&id=${id}`;
    },
  },
};
</script>
