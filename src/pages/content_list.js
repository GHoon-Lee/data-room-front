import Vue from "vue";
import AppContentList from "./AppContentList.vue";
import vuetify from "../plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(AppContentList),
}).$mount("#app");
