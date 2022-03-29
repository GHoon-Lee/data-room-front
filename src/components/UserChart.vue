<template>
  <div>
    <v-btn @click="getChartData">{{ flag }}</v-btn>
    <BarChart v-bind="barChartProps" />
  </div>
</template>

<script>
import { BarChart, useBarChart } from "vue-chart-3";
import {
  ref,
  computed,
  defineComponent,
  onMounted,
} from "@vue/composition-api";
import axios from "axios";
export default defineComponent({
  name: "App",
  components: {
    BarChart,
  },
  setup() {
    onMounted(() => {
      getChartData();
    });
    const type = ref("new");
    const flag = ref("누적");
    const data = ref([]);
    const labels = ref([]);

    const options = computed(() => ({
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    }));

    const chartData = computed(() => ({
      labels: labels.value,
      datasets: [
        {
          label: "가입자 수",
          data: data.value,
          backgroundColor: "#77CEFF",
        },
      ],
    }));

    const { barChartProps, barChartRef } = useBarChart({
      chartData,
      options,
    });

    function zoom() {
      barChartRef.value.chartInstance.zoom(1.01);
    }

    function getChartData() {
      axios
        .get(`/api/chartdata?type=${type.value}`)
        .then((res) => {
          var labell = [];
          var dataa = [];
          for (let i in res.data) {
            labell.push(res.data[i]["user_login_time"]);
            dataa.push(res.data[i]["count"]);
          }
          data.value = dataa;
          labels.value = labell;
          type.value = type.value == "total" ? "new" : "total";
          flag.value = flag.value == "일별" ? "누적" : "일별";
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return { barChartProps, barChartRef, zoom, getChartData, type, flag };
  },
});
</script>
