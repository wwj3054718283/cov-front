<template>
    <div class="areaBox">
        <div
            id="shanghai"
            class="mapbox"
            ref="shanghai"
            style="width: 780px; height: 520px"
        ></div>
        <div
            ref="dataTable"
            class="dataTable"
            style="width: 600px; height: 700px"
        ></div>
    </div>
</template>

<script>
import shanghai from "echarts/map/json/province/shanghai";
export default {
    name: "shanghai",
    methods: {
        async getData() {
            this.$echarts.registerMap("shanghai", shanghai);
            const myTable = this.$echarts.init(this.$refs.dataTable);
            const res = await this.$http.get("shanghai");
            let datas = res.data.data;
            let sourcedata = [["amount", "product"]];
            for (let i = 0; i < datas.length; i++) {
                let j = i + 1;
                sourcedata[j] = [datas[i].value, datas[i].name];
            }
            let option = {
                dataset: {
                    source: sourcedata,
                },
                grid: { containLabel: true },
                xAxis: { name: "确诊数" },
                yAxis: { type: "category" },
                visualMap: {
                    orient: "horizontal",
                    left: "center",
                    min: 10,
                    max: 100,
                    text: ["多", "少"],
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
                            // Map the "amount" column to X axis.
                            x: "amount",
                            // Map the "product" column to Y axis
                            y: "product",
                        },
                    },
                ],
            };
            myTable.setOption(option);
        },
        async getArea() {
            const myChart = this.$echarts.init(this.$refs.shanghai);
            // 注册矢量地图数据
            this.$echarts.registerMap("shanghai", shanghai);
            const res = await this.$http.get("shanghai");
            const mapdata = res.data.data;
            for (let i of mapdata) {
                i.name = i.name + "区";
            }
            var option = {
                title: {
                    text: "上海累计确诊病例分布",
                    subtext: "",
                    x: "left",
                    textStyle: {
                        fontSize: 48,
                        color: "#000",
                    },
                },
                visualMap: {
                    // 视觉映射组件
                    show: true,
                    inverse: true, // 反转
                    top: "70%",
                    bottom: "2%",
                    left: "2%",
                    textStyle: {
                        fontsize: 12,
                    },
                    splitList: [
                        // 自定义范围
                        { start: 0, end: 10 },
                        { start: 10, end: 100 },
                        { start: 100, end: 500 },
                        { start: 500, end: 1000 },
                        { start: 1000 },
                    ],
                    color: [
                        "#BF242A",
                        "#CD5459",
                        "#DC878A",
                        "#EAB7B9",
                        "#F3D7D9",
                    ], //自定义范围的颜色
                },
                tooltip: {
                    // 悬浮框
                    trigger: "item", // 触发条件
                    backgroundColor: "RGBA(136, 123, 135, 0.8)",
                    formatter: "{b}<br/>案件数{c}", // 自定义显示数据
                    textStyle: {
                        color: "#ffffff",
                    },
                },
                series: [
                    {
                        type: "map",
                        map: "shanghai",
                        roam: true,
                        zoom: 1.2,
                        top: "10%",
                        x: "center",
                        label: {
                            show: true, // 显示
                        },
                        itemStyle: {
                            normal: {
                                // 静态的时候显示的默认样式
                                areaColor: "#F3D7D9", // 地图颜色
                                borderColor: "#886364", // 边框颜色
                            },
                            emphasis: {
                                // 鼠标移入动态的时候显示的默认样式
                                borderWidth: 2, // 边框宽度
                                areaColor: "#ffffff", // 地图颜色
                            },
                        },
                        // 数据
                        data: mapdata,
                    },
                ],
            };
            myChart.setOption(option);
        },
    },
    mounted() {
        this.getArea();
        this.getData();
    },
};
</script>

<style scoped>
.shanghai {
    display: flex;
}
</style>
