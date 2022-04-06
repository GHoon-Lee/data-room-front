<template>
  <v-app id="inspire">
    <div>
      <MainMenu />
      <v-main v-if="!isLoaded"> 로딩중{{ isLoaded ? 1 : 2 }} </v-main>
      <v-main v-else-if="userInfo.username === 'Anonymous'">
        <h1>로그인을 해주세요</h1>
      </v-main>
      <v-main v-else>
        <div style="">
          <MainTable />
        </div>
        <div style="">
          <UserChart />
        </div>
        <div style="">
          <LogChart />
        </div>
      </v-main>
      <MainFooter />
    </div>
  </v-app>
</template>

<script>
import UserChart from "../components/UserChart.vue";
import LogChart from "../components/LogChart.vue";
import MainMenu from "../components/MainMenu.vue";
import MainTable from "../components/MainTable.vue";
import MainFooter from "../components/MainFooter.vue";
import EventBus from "../components/event_bus";

export default {
  components: { UserChart, MainMenu, MainFooter, LogChart, MainTable },
  data: () => ({
    userInfo: {
      id: null,
      division: null,
      username: "Anonymous",
    },
    isLoaded: false,
  }),
  mounted() {
    console.log("123");
    EventBus.$on("userinfo_change", (val) => {
      console.log("heelo");
      this.userInfo = val;
      this.isLoaded = true;
    });
    console.log(this.userInfo);
  },
};
</script>

<style scoped></style>
