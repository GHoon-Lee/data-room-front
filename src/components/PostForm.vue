<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" sm="12" lg="10">
        <v-text-field v-model="title" label="제목" required></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" sm="12" lg="10">
        <v-text-field v-model="description" label="요약"></v-text-field>
      </v-col>
    </v-row>
    <v-row align="start">
      <v-col cols="12" sm="12" lg="10">
        <v-textarea
          v-model="content"
          solo
          name="input-text"
          label="내용"
          height="500px"
          no-resize
          required
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row align="start">
      <v-col cols="4" sm="4" lg="3">
        <v-autocomplete
          v-model="read_auth"
          :items="read_auth_items"
          outlined
          dense
          chips
          small-chips
          label="읽기 권한"
          multiple
          item-text="username"
          item-value="id"
        ></v-autocomplete>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4" sm="4" lg="3">
        <v-btn @click="savePost">저장</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
// import axios from "axios";
import EventBus from "./event_bus";
export default {
  data: () => ({
    postId: null,
    type: "new",
    category: null,
    title: "",
    content: "",
    description: "",
    read_auth_items: [],
    read_auth: [],
    userInfo: {
      id: null,
      division: null,
      username: "Anonymous",
    },
  }),
  created() {
    const params = new URL(location).searchParams;
    var type = params.get("type");
    this.type = type;
    if (type === "edit") {
      var postId = params.get("id");
      this.postId = postId;
      axios
        .get(`/api/posts/${postId}`)
        .then((res) => {
          this.title = res.data["title"];
          this.content = res.data["content"];
          this.read_auth = res.data["read_auth"];
          this.description = res.data["description"];
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      var category = params.get("category");
      this.category = category;
    }
    axios
      .get(`/api/auth/users`)
      .then((res) => {
        this.read_auth_items = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    // var categoryId = params.get("categoryId");
    EventBus.$on("userinfo_change", (val) => {
      this.userInfo = val;
    });
  },
  methods: {
    savePost() {
      if (this.type === "new") {
        const postData = {
          title: this.title,
          content: this.content,
          read_auth: this.read_auth,
          category: this.category,
          description: this.description,
        };
        axios
          .post(`/api/posts`, postData)
          .then((res) => {
            location.href = `/posts/${res.data["id"]}`;
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.type === "edit") {
        const postData = {
          title: this.title,
          content: this.content,
          read_auth: this.read_auth,
          description: this.description,
        };
        axios
          .put(`/api/posts/${this.postId}`, postData)
          .then((res) => {
            location.href = `/posts/${res.data["id"]}`;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
