<template>
  <v-app id="inspire">
    <MainMenu />
    <v-main>
      <div style="">
        <UserChart />
      </div>
      <div style="">
        <LogChart />
      </div>
    </v-main>
    <!-- <v-main v-else>
      <h1>로그인을 해주세요</h1>
    </v-main> -->
    <MainFooter />
  </v-app>
</template>

<script>
import UserChart from "../components/UserChart.vue";
import LogChart from "../components/LogChart.vue";
import MainMenu from "../components/MainMenu.vue";
import MainFooter from "../components/MainFooter.vue";
import EventBus from "../components/event_bus";

export default {
  components: { UserChart, MainMenu, MainFooter, LogChart },
  data: () => ({
    userInfo: {
      id: null,
      division: null,
      username: "Anonymous",
    },
  }),
  created() {
    console.log("123");
    EventBus.$on("userinfo_change", (val) => {
      this.userInfo = val;
    });
    console.log(this.userInfo);
  },
};
</script>

<style scoped></style>
