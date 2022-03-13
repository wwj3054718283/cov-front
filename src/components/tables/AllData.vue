<template>
    <div class="allData">
        <el-table
            :data="tableData"
            height="100%"
            border
            style="width: 100%"
            id="eltable"
        >
            <el-table-column prop="day" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="province" label="省份" width="180">
            </el-table-column>
            <el-table-column prop="city" label="城市"> </el-table-column>
            <el-table-column prop="confirm" label="累计确诊"> </el-table-column>
            <el-table-column prop="confirm_add" label="新增确诊">
            </el-table-column>
            <el-table-column prop="confirm_now" label="现有确诊">
            </el-table-column>
            <el-table-column prop="heal" label="治愈"> </el-table-column>
            <el-table-column prop="dead" label="死亡"> </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "allData",
    data() {
        return {
            tableData: [],
        };
    },
    methods: {
        async get_allDetails() {
            const res = await this.$http.get("alldetails");
            if (res.status !== 200) {
                return console.log("请求数据图表-统计数据数据失败！");
            }
            this.tableData = res.data.data;
        },
    },
    mounted() {
        this.get_allDetails();
    },
};
</script>

<style scoped>
.allData {
    width: 80vw;
    height: 70vh;
    min-width: 1080px;
    position: absolute;
    top: 20vh;
    left: 15vw;
}
.el-table__body-wrapper,.is-scrolling-none{
    overflow-y: scroll;
    overflow-x: hidden;
}
.el-table__body-wrapper::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #f5f5f5;
}

.el-table__body-wrapper::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
}

.el-table__body-wrapper::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
}
</style>
