<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-card class="mx-auto" width="300">
        <v-list>
          <v-list-group :value="true" prepend-icon="mdi-account-circle">
            <template v-slot:activator>
              <v-list-item-title>목록</v-list-item-title>
            </template>

            <v-list-group
              v-for="(category, i) in categorys"
              :key="i"
              no-action
              sub-group
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{ category.name }}</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="(sub_category, i) in category.sub_category"
                :key="i"
                link
              >
                <v-list-item-title
                  v-text="sub_category.name"
                  @click="getContents(sub_category.id)"
                ></v-list-item-title>
              </v-list-item>
            </v-list-group>
          </v-list-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Prediction Data Room</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text dark v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
            Aaaaa
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  data: () => ({
    drawer: null,
    items: [
      { title: "Login" },
      { title: "Logout" },
      { title: "Password Change" },
    ],
    categorys: [],
  }),
  created() {
    this.getCategorys();
  },
  methods: {
    getCategorys() {
      axios
        .get("http://localhost:8000/api/categorys")
        .then((res) => {
          this.categorys = res.data;
        })
        .catch((err) => {
          console.log("GET ERR", err);
        });
    },
    getContents(categoryId) {
      location.href = `/contents?category=${categoryId}`;
    },
  },
};
</script>
