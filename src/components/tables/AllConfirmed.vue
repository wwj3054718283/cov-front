<template>
    <div id="TableBox">
        <div class="TableBoxitem">
            <div ref="Table_1" style="width: 972px; height: 720px"></div>
            <div ref="Table_2" style="width: 972px; height: 720px"></div>
        </div>
        <div class="TableBoxitem">
            <div ref="Table_3" style="width: 540px; height: 360px"></div>
            <div ref="Table_4" style="width: 540px; height: 360px"></div>
            <div ref="Table_5" style="width: 540px; height: 360px"></div>
            <div ref="Table_6" style="width: 540px; height: 360px"></div>
        </div>
    </div>
</template>

<script>
import "../../assets/tables.css";
export default {
    name: "AllConfirmed",
    data() {
        return {
            details: [{}, {}, {}, {}], //请求到的统计数据
            myChart_1: null,
            myChart_2: null,
            myChart_3: null,
            myChart_4: null,
            myChart_5: null,
            myChart_6: null,
            option_1: {
                color: ["#fe3412", "#91CC75", "#5470C6"],
                title: {
                    text: "全国累计数据",
                    top: 10,
                    left: 10,
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                    },
                },
                grid: {
                    right: "20%",
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true },
                    },
                },
                legend: {
                    data: ["累计确诊", "累计治愈", "累计死亡"],
                },
                xAxis: [
                    {
                        type: "category",
                        axisTick: {
                            alignWithLabel: true,
                        },
                        // prettier-ignore
                        data: [],
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "病例数",
                        position: "left",
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#EE6666",
                            },
                        },
                    },
                    {
                        type: "value",
                        name: "死亡数",
                        position: "right",
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#5470C6",
                            },
                        },
                    },
                ],
                dataZoom: [
                    {
                        type: "inside",
                        show: false,
                        xAxisIndex: [0],
                        start: 0,
                        end: 100,
                    },
                ],
                series: [
                    {
                        name: "累计确诊",
                        type: "bar",
                        yAxisIndex: 0,
                        data: [],
                    },
                    {
                        name: "累计治愈",
                        type: "bar",
                        yAxisIndex: 0,
                        data: [],
                    },
                    {
                        name: "累计死亡",
                        type: "line",
                        yAxisIndex: 1,
                        data: [],
                    },
                ],
            },
            option_3: {
                title: {
                    text: "全国疑似感染人数",
                    top: 10,
                    left: "center",
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                    },
                },
                grid: {
                    right: "20%",
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true },
                    },
                },
                xAxis: {
                    type: "category",
                    data: [],
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        data: [],
                        type: "line",
                        smooth: true,
                    },
                ],
            },

            settime: {},
        };
    },
    methods: {
        async get_allconfirmed_data() {
            const res = await this.$http.get("allconfirmed");
            if (res.statusText !== "OK") {
                return console.log("请求统计数据失败！");
            }
            this.option_1.xAxis[0].data = res.data.day;
            this.option_1.series[0].data = res.data.confirm;
            this.option_1.series[1].data = res.data.heal;
            this.option_1.series[2].data = res.data.dead;

            this.option_3.xAxis.data = res.data.day;
            this.option_3.series[0].data = res.data.suspect;
        },
        async initRadar() {
            const res = await this.$http.get("maxconfirmed");
            if (res.statusText !== "OK") {
                return console.log("请求统计数据失败！");
            }
            this.myChart_2 = this.$echarts.init(this.$refs.Table_2);
            let maxd = Math.max.apply(null, res.data[2].value);
            let lenv = res.data[0].name.length;
            let option_2 = {
                title: {
                    text: "疫情严重地区近期状况雷达图",
                    top: 10,
                    left: 10,
                },
                tooltip: {
                    trigger: "item",
                },
                legend: {
                    type: "scroll",
                    bottom: 10,
                    data: (function () {
                        let list = [];
                        for (let i = 0; i < lenv; i++) {
                            list.push(res.data[0].name[i]);
                        }
                        return list;
                    })(),
                },
                visualMap: {
                    top: "middle",
                    right: 10,
                    color: ["red", "yellow"],
                    calculable: true,
                },
                radar: {
                    indicator: [
                        { text: "上海", max: maxd },
                        { text: "湖北", max: maxd },
                        { text: "陕西", max: maxd },
                        { text: "香港", max: maxd },
                        { text: "台湾", max: maxd },
                    ],
                },
                series: (function () {
                    var series = [];
                    for (let i = 1; i <= lenv; i++) {
                        series.push({
                            type: "radar",
                            symbol: "none",
                            lineStyle: {
                                width: 1,
                            },
                            emphasis: {
                                areaStyle: {
                                    color: "rgba(250,250,95,0.6)",
                                },
                            },
                            data: [
                                {
                                    value: [
                                        res.data[3].shanghai[i],
                                        res.data[4].hubei[i],
                                        res.data[5].shanxi[i],
                                        res.data[6].xianggang[i],
                                        res.data[7].taiwan[i],
                                    ],
                                    name: res.data[0].name[i],
                                },
                            ],
                        });
                    }
                    return series;
                })(),
            };
            this.myChart_2.setOption(option_2);
        },
        async initPie() {
            const res = await this.$http.get("home_data");
            if (res.statusText !== "OK") {
                return console.log("请求统计数据失败！");
            }
            let option_4 = {
                title: {
                    text: "累计数据比例",
                    left: "center",
                },
                tooltip: {
                    trigger: "item",
                },
                legend: {
                    orient: "vertical",
                    left: "left",
                },
                series: [
                    {
                        name: "Data From",
                        type: "pie",
                        radius: "50%",
                        data: [
                            {
                                value: res.data[0].confirm,
                                name: "累计确诊",
                            },
                            { value: res.data[2].heal, name: "累计治愈" },
                            { value: res.data[3].dead, name: "累计死亡" },
                            {
                                value: res.data[1].suspect,
                                name: "累计疑似",
                            },
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            };
            this.myChart_4 = this.$echarts.init(this.$refs.Table_4);
            this.myChart_4.setOption(option_4);
        },
        async initSplashes() {
            const res = await this.$http.get("allconfirmed");
            if (res.statusText !== "OK") {
                return console.log("请求统计数据失败！");
            } else {
                let len = res.data.confirm.length;
                let option_5 = {
                    title: {
                        text: "确诊-X/治愈-Y分布",
                        top: 10,
                        left: "center",
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "cross",
                        },
                    },
                    xAxis: {
                        scale: true,
                    },
                    yAxis: {
                        scale: true,
                    },
                    series: [
                        {
                            type: "scatter",
                            symbolSize: 5,
                            data: (function () {
                                let arr = [];
                                for (let i = 0; i < len; i++) {
                                    let item = [];
                                    item[0] = res.data.confirm[i];
                                    item[1] = res.data.heal[i];
                                    arr.push(item);
                                }
                                return arr;
                            })(),
                        },
                    ],
                };
                this.myChart_5 = this.$echarts.init(this.$refs.Table_5);
                this.myChart_5.setOption(option_5);
            }
        },
        async initPolar() {
            const res = await this.$http.get("home_data");
            if (res.statusText !== "OK") {
                return console.log("请求统计数据失败！");
            }
            let option_6 = {
                title: [
                    {
                        text: "极坐标下累计数据情况",
                        top: 10,
                        left: "center",
                    },
                ],
                polar: {
                    radius: [30, "80%"],
                },
                angleAxis: {
                    max: "dataMax",
                    startAngle: 75,
                },
                radiusAxis: {
                    type: "category",
                    data: ["疑似病例", "死亡病例", "治愈病例", "确诊病例"],
                },
                tooltip: {},
                series: {
                    type: "bar",
                    data: [
                        res.data[1].suspect,
                        res.data[3].dead,
                        res.data[2].heal,
                        res.data[0].confirm,
                    ],
                    coordinateSystem: "polar",
                    label: {
                        show: true,
                        position: "inside",
                        formatter: "{b}: {c}",
                    },
                },
            };
            this.myChart_6 = this.$echarts.init(this.$refs.Table_6);
            this.myChart_6.setOption(option_6);
        },
        initChart_1() {
            this.get_allconfirmed_data();
            if (
                this.myChart_1 == undefined ||
                this.myChart_1 == null ||
                this.myChart_1 == ""
            ) {
                this.myChart_1 = this.$echarts.init(this.$refs.Table_1);
                this.myChart_1.setOption(this.option_1);
            } else {
                this.myChart_1.setOption(this.option_1);
            }
        },
        initChart_3() {
            this.get_allconfirmed_data();
            if (
                this.myChart_3 == undefined ||
                this.myChart_3 == null ||
                this.myChart_3 == ""
            ) {
                this.myChart_3 = this.$echarts.init(this.$refs.Table_3);
                this.myChart_3.setOption(this.option_3);
            } else {
                this.myChart_3.setOption(this.option_3);
            }
        },
        drawChart() {
            this.initChart_1();
            this.initChart_3();
        },
        setIntervals() {
            this.settime = setInterval(this.drawChart, 1000);
        },
    },
    mounted() {
        this.initRadar();
        this.initPie();
        this.initSplashes();
        this.initPolar();
        this.$nextTick(() => {
            // 待优化
            this.setIntervals();
        });
    },
    beforeDestroy() {
        window.clearInterval(this.settime);
    },
};
</script>

<style lang="less">
#TableBox {
    // height: 85vh;
    width: 100%;
    min-width: 1600px;
    position: absoulute;
    top: 15vh;
    background-color: #eee;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .TableBoxitem {
        display: flex;
        flex-direction: column;
        div {
            margin-top: 20px;
            background-color: #fff;
        }
    }
}
</style>
