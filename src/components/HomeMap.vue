<template>
    <div id="homepage">
        <div
            class="HomeMap"
            ref="HomeMap"
            style="width: 1080px; height: 720px"
        ></div>
        <div id="btn">
            <el-button
                :disabled="!isNow"
                type="danger"
                round
                @click="handleClickAll"
                >累计确诊</el-button
            >
            <el-button
                :disabled="isNow"
                type="danger"
                round
                @click="handleClickNow"
                >现有确诊</el-button
            >
        </div>
        <div
            class="provinceList"
            ref="provinceList"
            style="width: 400px; height: 720px"
        ></div>
    </div>
</template>

<script>
export default {
    name: "ChinaMap",
    data() {
        return {
            data: [],
            myChart: null,
            isNow: true,
            option: {
                title: {
                    text: "全国新冠肺炎疫情分布",
                    subtext: "",
                    x: "center",
                    textStyle: {
                        fontSize: 48,
                        color: "#000",
                    },
                },

                tooltip: {
                    trigger: "item",
                },
                //左侧小导航图标
                visualMap: {
                    show: true,
                    x: "left",
                    y: "bottom",
                    textStyle: {
                        fontSize: 16,
                        color: "#000",
                    },
                    splitList: [
                        { start: 0, end: 0 },
                        { start: 1, end: 9 },
                        { start: 10, end: 99 },
                        { start: 100, end: 999 },
                        { start: 1000, end: 9999 },
                        { start: 10000 },
                    ],
                    color: [
                        "#8A3310",
                        "#C64918",
                        "#E55B25",
                        "#F2AD92",
                        "#F9DCD1",
                        "#b7ffe6",
                    ],
                },
                //配置属性
                series: [
                    {
                        name: "确诊人数",
                        type: "map",
                        map: "china",
                        roam: true, //拖动和缩放
                        zoom: 1.25,
                        itemStyle: {
                            normal: {
                                borderWidth: 0.5, //区域边框宽度
                                borderColor: "#62d3ff", //区域边框颜色
                                areaColor: "#b7ffe6", //区域颜色
                            },
                            emphasis: {
                                //鼠标滑过地图高亮的相关设置
                                borderWidth: 0.5,
                                borderColor: "#fff",
                                areaColor: "#62d3ff",
                            },
                        },
                        label: {
                            normal: {
                                show: true, //省份名称
                                fontSize: 12,
                            },
                            emphasis: {
                                show: true,
                                fontSize: 12,
                            },
                        },
                        data: [],
                    },
                ],
            },
        };
    },
    methods: {
        async get_HomeMap() {
            const res = await this.$http.get("home_map");
            if (res.status !== 200) {
                return console.log("请求地图数据失败！");
            }
            let data = res.data.data;
            let mapdata = res.data.data;
            if (!this.isNow) {
                for (let i = 0; i < data.length; i++) {
                    mapdata[i].value = data[i].confirm;
                }
            }
            this.option.series[0].data = mapdata;

            const myTable = this.$echarts.init(this.$refs.provinceList);
            let datas = res.data.data;
            let sourcedata = [["amount", "product"]];
            for (let i = 0; i < datas.length; i++) {
                sourcedata[i] = [datas[i].confirm, datas[i].name];
            }
            let option = {
                title: {
                    text: "各省份数据统计图",
                    top: 10,
                    left: "center",
                },
                dataset: {
                    source: sourcedata,
                },
                grid: { containLabel: true },
                xAxis: { name: "确诊数" },
                yAxis: {
                    type: "category",
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                    },
                },
                visualMap: {
                    orient: "horizontal",
                    left: "center",
                    min: 10,
                    max: 100,
                    text: ["High", "Low"],
                    // Map the score column to color
                    dimension: 0,
                    inRange: {
                        color: ["#65B581", "#FFCE34", "#FD665F"],
                    },
                },
                series: [
                    {
                        type: "bar",
                        encode: {
                            x: "amount",
                            y: "product",
                        },
                    },
                ],
            };
            myTable.setOption(option);
        },
        async initChart() {
            await this.get_HomeMap();
            if (
                this.myChart == undefined ||
                this.myChart == null ||
                this.myChart == ""
            ) {
                this.myChart = this.$echarts.init(this.$refs.HomeMap);
                this.myChart.setOption(this.option);
            } else {
                this.myChart.setOption(this.option);
            }
        },
        handleClickNow() {
            this.isNow = true;
            this.initChart();
        },
        handleClickAll() {
            this.isNow = false;
            this.initChart();
        },
    },
    mounted() {
        this.initChart();
    },
};
</script>

<style scoped>
#homepage {
    width: 90vw;
    height: 85vh;
    min-width: 1600px;
    position: absoulute;
    top: 15vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.HomeMap {
    min-width: 1080px;
    min-height: 720px;
}
#btn {
    position: absolute;
    width: 300px;
    height: 50px;
    left: 13vw;
    top: 16vh;
}
</style>
