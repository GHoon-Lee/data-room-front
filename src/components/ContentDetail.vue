<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" lg="10">
        <h1>{{ content.title }}</h1>
        <p>{{ content.updated_time }}, {{ content.user_name }}</p>
      </v-col>
    </v-row>
    <v-row align="start" justify="center">
      <v-col cols="12" sm="12" lg="10">
        <v-card class="pa-2" outlined tile>
          <p style="white-space: pre-wrap">{{ content.content }}</p>
          <br />
          <br />
          <br />
          <a href="#" @click="getFile">{{ content.file_name }}</a>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",

  data: () => ({
    content: {},
  }),
  created() {
    const contentId = location.pathname.split("/")[2];
    this.getContent(contentId);
  },
  methods: {
    getContent(contentId) {
      axios
        .get(`http://localhost:8000/api/contents/${contentId}`)
        .then((res) => {
          this.content = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFile() {
      location.href = this.content["file"];
    },
  },
};
</script>
