import Vue from "vue";
import AppPostForm from "./AppPostForm.vue";
import vuetify from "../plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(AppPostForm),
}).$mount("#app");
