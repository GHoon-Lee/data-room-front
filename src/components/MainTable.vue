<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="4" sm="4" lg="3" align="center" justify="center">
        <div style="font-size: 20px">누적다운로드수</div>
        <div style="font-size: 40px; font-weight: bold">
          {{ tableData.download_count }} 만
        </div>
      </v-col>
      <v-col cols="4" sm="4" lg="4" align="center" justify="center">
        <div style="font-size: 20px">회원 1명당 문제풀이 갯수</div>
        <div style="font-size: 40px; font-weight: bold">
          {{ tableData.solve_count_for_user }} 문제
        </div>
      </v-col>
      <v-col cols="4" sm="4" lg="3" align="center" justify="center">
        <div style="font-size: 20px">일평균 문제풀이 갯수</div>
        <div style="font-size: 40px; font-weight: bold">
          {{ tableData.solve_count_for_day }} 개
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import EventBus from "./event_bus";
export default {
  data: () => ({
    userInfo: {
      id: null,
      division: null,
      username: "Anonymous",
    },
    tableData: {
      download_count: 0,
      solve_count_for_user: 0,
      solve_count_for_day: 0,
    },
  }),
  created() {
    EventBus.$on("userinfo_change", (val) => {
      this.userInfo = val;
    });
    this.getDataTable();
    console.log(this.tableData);
  },
  methods: {
    getDataTable() {
      axios
        .get("/api/table-datas")
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
