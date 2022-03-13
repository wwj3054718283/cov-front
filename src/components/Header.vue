<template>
    <div id="headdata">
        <div class="num">
            <h1>{{details[0].confirm}}</h1>
        </div>
        <div class="num">
            <h1>{{details[1].suspect}}</h1>
        </div>
        <div class="num">
            <h1>{{details[2].heal}}</h1>
        </div>
        <div class="num">
            <h1>{{details[3].dead}}</h1>
        </div>
        <div class="txt">
            <h1>累计确诊</h1>
        </div>
        <div class="txt">
            <h1>疑似病例</h1>
        </div>
        <div class="txt">
            <h1>累计治愈</h1>
        </div>
        <div class="txt">
            <h1>累计死亡</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    data(){
        return{
            details:[{},{},{},{}]//请求到的统计数据
        }
    },
    created() {
        this.get_header_data();
    },
    methods: {
        async get_header_data() {
            const res = await this.$http.get("home_data");
            if(res.statusText!=="OK"){
                return console.log("请求统计数据失败！");
            }
            this.details=res.data

        },
    },
};
</script>

<style scoped>
#headdata {
    position: absolute;
    width: 90vw;
    height: 100%;
    color: #000;
    padding: 0;
    min-width: 1148px;
}

.num {
    width: 25%;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    color: gold;
    font-size: 20px;
}

.txt {
    width: 25%;
    float: left;
    font-family: "幼圆";
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
