import Vue from "vue";
import AppHome from "./AppHome.vue";
import vuetify from "../plugins/vuetify";

import { Chart, registerables } from "chart.js";
import zoomplugin from "chartjs-plugin-zoom";
import VComp from "@vue/composition-api";

Chart.register(...registerables, zoomplugin);
Vue.use(VComp);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(AppHome),
}).$mount("#app");
