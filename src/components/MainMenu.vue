<template>
  <div>
    <v-navigation-drawer width="400" v-model="drawer" app clipped>
      <v-card class="mx-auto">
        <v-list v-if="userInfo.username === 'Anonymous'">
          <v-list-group :value="false">
            <template v-slot:activator>
              <v-list-item-title align="left">로그인 필요</v-list-item-title>
            </template>
          </v-list-group>
        </v-list>
        <v-list v-else>
          <v-list-group :value="true">
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
          <v-list-group v-if="postCategorys.length > 0">
            <template v-slot:activator>
              <v-list-item-title>Prediction Post</v-list-item-title>
            </template>
            <v-list-item
              v-for="(post_category, i) in postCategorys"
              :key="i"
              link
            >
              <v-list-item-title
                v-text="post_category.name"
                @click="getPosts(post_category.id)"
              ></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <button @click="goHome()">Prediction Data Room</button></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text dark v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
            {{ userInfo.username }}
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <template v-if="userInfo.username === 'Anonymous'">
            <v-list-item @click="dialogOpen('login')">
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
            <v-list-item @click="dialogOpen('pwdchg')">
              <v-list-item-title>Password change</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-dialog v-model="dialog.login" max-width="600">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form id="login-form" ref="loginForm">
            <v-text-field
              label="Username"
              name="username"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>
            <v-text-field
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn text color="grey" @click="cancel('login')">취소</v-btn>
            <v-btn
              type="submit"
              color="primary"
              class="mr-5"
              @click="save('login', $event)"
              >로그인</v-btn
            >
          </v-form>
        </v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
    <!-- pwdchg dialog -->
    <v-dialog v-model="dialog.pwdchg" max-width="600">
      <v-card class="elevation-12">
        <v-toolbar color="warning" dark flat>
          <v-toolbar-title>Password change form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form id="pwdchg-form" ref="pwdchgForm">
            <v-text-field
              label="Old password"
              name="old_password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
            <v-text-field
              label="New password"
              name="new_password1"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
            <v-text-field
              label="New password again"
              name="new_password2"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="cancel('pwdchg')">취소</v-btn>
          <v-btn color="warning" class="mr-5" @click="save('pwdchg', $event)"
            >확인</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import EventBus from "./event_bus";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default {
  components: {},
  data: () => ({
    drawer: null,
    categorys: [],
    postCategorys: [],
    dialog: {
      login: false,
      pwdchg: false,
    },
    userInfo: {
      id: null,
      division: null,
      username: "Anonymous",
    },
  }),
  watch: {
    userInfo(newVal, oldVal) {
      console.log("watch.me()...", newVal, oldVal);
      EventBus.$emit("userinfo_change", newVal);
    },
  },
  created() {
    this.getUserInfo();
    this.getCategorys();
    this.getPostCategorys();
  },
  methods: {
    getCategorys() {
      axios
        .get("/api/categorys")
        .then((res) => {
          this.categorys = res.data;
        })
        .catch((err) => {
          console.log("GET ERR", err);
        });
    },
    getPostCategorys() {
      axios
        .get("/api/categorys/posts")
        .then((res) => {
          this.postCategorys = res.data;
        })
        .catch((err) => {
          console.log("GET ERR", err);
        });
    },
    getContents(categoryId) {
      location.href = `/contents?categoryId=${categoryId}`;
    },
    getPosts(categoryId) {
      location.href = `/posts?categoryId=${categoryId}`;
    },
    cancel(kind) {
      console.log("cancel()...", kind);
      if (kind === "login") {
        this.dialog.login = false;
        this.$refs.loginForm.reset();
      } else if (kind === "pwdchg") {
        this.dialog.pwdchg = false;
        this.$refs.pwdchgForm.reset();
      }
    },
    dialogOpen(kind) {
      console.log("dialogOpen()...", kind);
      if (kind === "login") {
        this.dialog.login = true;
      } else if (kind === "pwdchg") {
        this.dialog.pwdchg = true;
      }
    },

    save(kind, e) {
      e.preventDefault();
      console.log("save()...", kind);
      if (kind === "login") {
        this.login();
        this.dialog.login = false;
        this.$refs.loginForm.reset();
      } else if (kind === "pwdchg") {
        this.pwdchg();
        this.dialog.pwdchg = false;
        this.$refs.pwdchgForm.reset();
      }
    },
    login() {
      console.log("login()...");
      const postData = new FormData(document.getElementById("login-form"));
      axios
        .post("/api/login", postData)
        .then((res) => {
          console.log("LOGIN POST RES", res);
          // alert(`user ${res.data.username} login OK`);
          this.userInfo = res.data;
          this.getCategorys();
          this.getPostCategorys();
        })
        .catch((err) => {
          console.log("LOGIN POST ERR.RESPONSE", err.response);
          alert("login NOK");
        });
    },
    logout() {
      console.log("logout()...");
      axios
        .get("/api/logout")
        .then((res) => {
          console.log("LOGOUT GET RES", res);
          alert(`user ${this.userInfo.username} logout OK`);
          this.userInfo = { username: "Anonymous", id: null, division: null };
          window.location.replace("/");
        })
        .catch((err) => {
          console.log("LOGOUT GET ERR.RESPONSE", err.response);
          alert("logout NOK");
        });
    },

    pwdchg() {
      console.log("pwdchg()...");
      const postData = new FormData(document.getElementById("pwdchg-form"));
      axios
        .post("/api/pwdchg", postData)
        .then((res) => {
          console.log("PWDCHG POST RES", res);
          alert(`user ${this.userInfo.username} password change OK`);
        })
        .catch((err) => {
          console.log("PWDCHG POST ERR.RESPONSE", err.response);
          alert("password change NOK");
        });
    },
    getUserInfo() {
      console.log("getUserInfo()...");
      axios
        .get("/api/user/detail")
        .then((res) => {
          console.log("GETUSERINFO GET RES", res);
          this.userInfo = res.data;
        })
        .catch((err) => {
          console.log("GETUSERINFO GET ERR.RESPONSE", err.response);
          alert(err.response.status + " " + err.response.statusText);
        });
    },
    goHome() {
      window.location.replace("/");
    },
  },
};
</script>
