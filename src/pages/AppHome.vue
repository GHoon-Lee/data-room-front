<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-card class="mx-auto" width="300">
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>

            <v-list-item-title
              ><a href="/content_list.html">Home</a></v-list-item-title
            >
          </v-list-item>

          <v-list-group :value="true" prepend-icon="mdi-account-circle">
            <template v-slot:activator>
              <v-list-item-title>Users</v-list-item-title>
            </template>

            <v-list-group :value="true" no-action sub-group>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Admin</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item v-for="([title, icon], i) in admins" :key="i" link>
                <v-list-item-title v-text="title"></v-list-item-title>

                <v-list-item-icon>
                  <v-icon v-text="icon"></v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-group>

            <v-list-group no-action sub-group>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Actions</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item v-for="([title, icon], i) in cruds" :key="i" link>
                <v-list-item-title v-text="title"></v-list-item-title>

                <v-list-item-icon>
                  <v-icon v-text="icon"></v-icon>
                </v-list-item-icon>
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

    <v-main>
      <Home />
    </v-main>
    <v-footer app> &copy; Prediction </v-footer>
  </v-app>
</template>

<script>
import Home from "../components/Home.vue";
export default {
  components: { Home },
  data: () => ({
    drawer: null,
    admins: [
      ["Management", "mdi-account-multiple-outline"],
      ["Settings", "mdi-cog-outline"],
    ],
    cruds: [
      ["Create", "mdi-plus-outline"],
      ["Read", "mdi-file-outline"],
      ["Update", "mdi-update"],
      ["Delete", "mdi-delete"],
    ],
    items: [
      { title: "Login" },
      { title: "Register" },
      { title: "Logout" },
      { title: "Password Change" },
    ],
  }),
};
</script>
