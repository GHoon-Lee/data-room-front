import Vue from "vue";
import AppContentDetail from "./AppContentDetail.vue";
import vuetify from "../plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(AppContentDetail),
}).$mount("#app");
