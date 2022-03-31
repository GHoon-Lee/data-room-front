<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="contents"
      sort-by="updated_time"
      class="elevation-1"
      :items-per-page="5"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title> {{ categoryName }} </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon small class="mr-2 pa-4" @click="getFile(item)"
          >mdi-arrow-collapse-down</v-icon
        >
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getContents">Reset</v-btn>
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
      { text: "파일 이름", value: "file_name" },
      { text: "작성/수정일", value: "updated_time" },
      { text: "작성자", value: "user_name" },
      { text: "Download", value: "action", sortable: false, align: "center" },
    ],
    categoryName: "",
    contents: [],
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
    this.getContents(categoryId);
  },

  methods: {
    getContents(categoryId) {
      axios
        .get(`/api/contents?category=${categoryId}`)
        .then((res) => {
          this.contents = res.data["contents"];
          this.categoryName = res.data["category_name"];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFile(item) {
      location.href = item.file_url;
      // console.log(item.file_url);
    },
  },
};
</script>

<style scoped>
.v-data-table >>> tbody > tr > td > button {
  cursor: pointer;
  font-style: italic;
}
</style>
