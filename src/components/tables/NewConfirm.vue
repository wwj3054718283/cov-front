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
export default {
    name: "newConfirm",
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
                title: {
                    text: "全国每日新增数据",
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
                    data: ["新增确诊", "新增疑似", "新增治愈", "新增死亡"],
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
                        name: "人数",
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
                        name: "人数",
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
                        start: 70,
                        end: 100,
                    },
                ],
                series: [
                    {
                        name: "新增确诊",
                        type: "line",
                        yAxisIndex: 0,
                        data: [],
                        lineStyle: {
                            color: "#EE6666",
                        },
                    },
                    {
                        name: "新增疑似",
                        type: "bar",
                        yAxisIndex: 1,
                        data: [],
                        itemStyle: {
                            color: "#FFCE34",
                        },
                    },
                    {
                        name: "新增治愈",
                        type: "bar",
                        yAxisIndex: 1,
                        data: [],
                        itemStyle: {
                            color: "#65B581",
                        },
                    },
                    {
                        name: "新增死亡",
                        type: "bar",
                        yAxisIndex: 1,
                        data: [],
                        itemStyle: {
                            color: "#000000",
                        },
                    },
                ],
            },
            option_3: {
                title: {
                    text: "每日新增确诊病例",
                    left: "center",
                    top: 10,
                },
                tooltip: {
                    trigger: "axis",
                },
                grid: {
                    left: "10%",
                    right: "15%",
                    bottom: "10%",
                },
                xAxis: {
                    data: [],
                },
                yAxis: {},
                toolbox: {
                    right: 10,
                    feature: {
                        dataZoom: {
                            yAxisIndex: "none",
                        },
                        restore: {},
                        saveAsImage: {},
                    },
                },
                dataZoom: [
                    {
                        startValue: "02-01",
                    },
                    {
                        type: "inside",
                    },
                ],
                visualMap: {
                    top: 50,
                    right: 10,
                    pieces: [
                        {
                            gt: 0,
                            lte: 5000,
                            color: "#93CE07",
                        },
                        {
                            gt: 5000,
                            lte: 10000,
                            color: "#FBDB0F",
                        },
                        {
                            gt: 10000,
                            lte: 15000,
                            color: "#FC7D02",
                        },
                        {
                            gt: 15000,
                            lte: 20000,
                            color: "#FD0100",
                        },
                        {
                            gt: 20000,
                            lte: 30000,
                            color: "#AA069F",
                        },
                        {
                            gt: 30000,
                            color: "#AC3B2A",
                        },
                    ],
                    outOfRange: {
                        color: "#999",
                    },
                },
                series: {
                    name: "每日新增确诊病例",
                    type: "line",
                    data: [],
                    markLine: {
                        silent: true,
                        lineStyle: {
                            color: "#333",
                        },
                        data: [
                            {
                                yAxis: 5000,
                            },
                            {
                                yAxis: 10000,
                            },
                            {
                                yAxis: 15000,
                            },
                            {
                                yAxis: 20000,
                            },
                            {
                                yAxis: 30000,
                            },
                        ],
                    },
                },
            },

            settime: {},
        };
    },
    methods: {
        async get_allconfirmed_data() {
            const res = await this.$http.get("addallconfirmed");
            if (res.statusText !== "OK") {
                return console.log("请求统计数据失败！");
            }
            this.option_1.xAxis[0].data = res.data.day;
            this.option_1.series[0].data = res.data.confirm_add;
            this.option_1.series[1].data = res.data.suspect_add;
            this.option_1.series[2].data = res.data.heal_add;
            this.option_1.series[3].data = res.data.dead_add;

            this.option_3.xAxis.data = res.data.day;
            this.option_3.series.data = res.data.confirm_add;
        },
        async initRadar() {
            const res = await this.$http.get("addallconfirmed");
            if (res.statusText !== "OK") {
                return console.log("请求统计数据失败！");
            }
            this.myChart_2 = this.$echarts.init(this.$refs.Table_2);
            let lenv = res.data.day.length;
            let maxconfirm_add = Math.max.apply(null, res.data.confirm_add);
            let maxconfirm_now = Math.max.apply(null, res.data.confirm_now);
            let maxsuspect_add = Math.max.apply(null, res.data.suspect_add);
            let maxheal_add = Math.max.apply(null, res.data.heal_add);
            let maxdead_add = Math.max.apply(null, res.data.dead_add);
            let option_2 = {
                title: {
                    text: "近期疫情新增情况雷达图",
                    top: 10,
                    left: 10,
                },
                tooltip: {
                    trigger: "item",
                },
                legend: {
                    type: "scroll",
                    bottom: 10,
                    data: res.data.day,
                },
                visualMap: {
                    top: "middle",
                    right: 10,
                    color: ["red", "yellow"],
                    calculable: true,
                },
                radar: {
                    indicator: [
                        { text: "新增确诊", max: maxconfirm_add },
                        { text: "现有确诊", max: maxconfirm_now },
                        { text: "新增疑似", max: maxsuspect_add },
                        { text: "新增治愈", max: maxheal_add },
                        { text: "新增死亡", max: maxdead_add },
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
                                        res.data.confirm_add[i],
                                        res.data.confirm_now[i],
                                        res.data.suspect_add[i],
                                        res.data.heal_add[i],
                                        res.data.dead_add[i],
                                    ],
                                    name: res.data.day[i],
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
            const res = await this.$http.get("addallconfirmed");
            if (res.statusText !== "OK") {
                return console.log("请求统计数据失败！");
            }
            let data = ["时间"].concat(res.data.day);
            let suspect_add = ["新增疑似"].concat(res.data.suspect_add);
            let heal_add = ["新增治愈"].concat(res.data.heal_add);
            let dead_add = ["新增死亡"].concat(res.data.dead_add);
            let deadadd = dead_add.map((item) => (item = 0 - item));
            let option_4 = {
                title: {
                    text: "新增死亡/治愈比",
                    top:10,
                    left:10
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                legend: {
                    data: ["疑似确诊", "新增死亡", "新增治愈"],
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: "value",
                    },
                ],
                yAxis: [
                    {
                        type: "category",
                        axisTick: {
                            show: false,
                        },
                        data: data,
                    },
                ],
                dataZoom: [
                    {
                        yAxisIndex: [0],
                        type: "inside",
                        start: 90,
                        end: 100,
                    },
                ],
                series: [
                    {
                        name: "疑似确诊",
                        type: "bar",
                        label: {
                            show: true,
                            position: "inside",
                        },
                        emphasis: {
                            focus: "series",
                        },
                        data: suspect_add,
                    },
                    {
                        name: "新增治愈",
                        type: "bar",
                        stack: "Total",
                        label: {
                            show: true,
                        },
                        emphasis: {
                            focus: "series",
                        },
                        data: heal_add,
                    },
                    {
                        name: "新增死亡",
                        type: "bar",
                        stack: "Total",
                        label: {
                            show: true,
                            position: "left",
                        },
                        emphasis: {
                            focus: "series",
                        },
                        data: deadadd,
                    },
                ],
            };
            this.myChart_4 = this.$echarts.init(this.$refs.Table_4);
            this.myChart_4.setOption(option_4);
        },
        async initSplashes() {
            const res = await this.$http.get("addallconfirmed");
            if (res.statusText !== "OK") {
                return console.log("请求统计数据失败！");
            }
            let data = ["时间"].concat(res.data.day).slice(-7);
            let heal_add = ["新增治愈"].concat(res.data.heal_add).slice(-7);
            let dead_add = ["新增死亡"].concat(res.data.dead_add).slice(-7);
            let arr = heal_add.concat(dead_add);
            let max = Math.max(arr);
            let option_5 = {
                title: {
                    text: "死亡/治愈比",
                    left: 10,
                    top:10
                },
                angleAxis: {
                    max: max,
                    startAngle: 30,
                    splitLine: {
                        show: false,
                    },
                },
                radiusAxis: {
                    type: "category",
                    data: data,
                    z: 10,
                },
                polar: {},
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                series: [
                    {
                        type: "bar",
                        data: heal_add,
                        coordinateSystem: "polar",
                        name: "治愈病例",
                        itemStyle: {
                            borderColor: "green",
                            opacity: 0.8,
                            borderWidth: 1,
                        },
                    },
                    {
                        type: "bar",
                        data: dead_add,
                        coordinateSystem: "polar",
                        name: "死亡病例",
                        roundCap: true,
                        itemStyle: {
                            borderColor: "black",
                            opacity: 0.8,
                            borderWidth: 1,
                        },
                    },
                ],
                legend: {
                    show: true,
                    data: ["治愈病例", "死亡病例"],
                },
            };
            this.myChart_5 = this.$echarts.init(this.$refs.Table_5);
            this.myChart_5.setOption(option_5);
        },
        async initPolar() {
            const res = await this.$http.get("addallconfirmed");
            if (res.statusText !== "OK") {
                return console.log("请求统计数据失败！");
            }
            let option_6 = {
               title: {
                    text: "确诊/治愈比",
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
                    data: ["现有确诊", "新增治愈"],
                },
                xAxis: [
                    {
                        type: "category",
                        axisTick: {
                            alignWithLabel: true,
                        },
                        data: res.data.day,
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "人数",
                        position: "left",
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#EE6666",
                            },
                        },
                    }
                ],
                dataZoom: [
                    {
                        type: "inside",
                        show: false,
                        xAxisIndex: [0],
                        start: 90,
                        end: 100,
                    },
                ],
                series: [
                    {
                        name: "现有确诊",
                        type: "line",
                        yAxisIndex: 0,
                        data: res.data.confirm_now,
                        lineStyle: {
                            color: "#EE6666",
                        },
                    },
                    {
                        name: "新增治愈",
                        type: "bar",
                        yAxisIndex: 0,
                        data: res.data.heal_add,
                        itemStyle: {
                            color: "#65B581",
                        },
                    }
                ],
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
