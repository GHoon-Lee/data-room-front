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
          <!-- <a href="#" @click="getFile">{{ content.file_name }}</a> -->
          <a @click="getFile" download>
            <span style="margin-right: 10px">{{ content.file_name }}</span>
            <!-- <v-btn @click="getFile">
              <v-icon>download icon</v-icon>
            </v-btn> -->
          </a>
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
    content: {},
    userInfo: {
      id: null,
      division: null,
      username: "Anonymous",
    },
  }),
  created() {
    EventBus.$on("userinfo_change", (val) => {
      this.userInfo = val;
    });
    const contentId = location.pathname.split("/")[2];
    this.getContent(contentId);
  },
  methods: {
    getContent(contentId) {
      axios
        .get(`/api/contents/${contentId}`)
        .then((res) => {
          this.content = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFile() {
      // const ele = document.createElement("a");
      // ele.setAttribute(
      //   "href",
      //   `https://prediction-datas.s3.ap-northeast-2.amazonaws.com/${this.content["file"]}`
      // );
      // ele.setAttribute("download", "");
      // ele.click();
      location.href = this.content["file"];
    },
  },
};
</script>
