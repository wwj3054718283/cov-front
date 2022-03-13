<template>
    <div id="Nav">
        <el-menu
            id="elmenu"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened
            :collapse-transition="false"
            :router="true"
            :default-active="activePath"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#333744"
            @scroll="handleScroll($event)"
        >
            <div id="logoBox">
                <img src="../assets/logo.png" alt="logo" />
                <h3>疫情数据可视化系统</h3>
            </div>
            <el-menu-item index="ChinaMap" @click="saveNavState('ChinaMap')">
                <template slot="title">
                    <i class="el-icon-s-home"></i>
                    <span>全局概览</span>
                </template>
            </el-menu-item>
            <!-- 一级菜单 -->
            <el-submenu
                :index="item.path + ''"
                v-for="item in allData"
                :key="item.id"
                class="infinite-list"
                v-infinite-scroll="load"
                style="overflow: auto"
            >
                <template slot="title">
                    <!-- 图标 -->
                    <i :class="iconsObj[item.id]"></i>
                    <!-- 文本 -->
                    <span>{{ item.authName }}</span>
                </template>
                <!-- 二级菜单 -->
                <el-menu-item
                    :index="'/' + subItem.path"
                    v-for="subItem in item.children"
                    :key="subItem.id"
                    @click="saveNavState('/' + subItem.path)"
                >
                    <template slot="title">
                        <i class="el-icon-s-data"></i>
                        <span>{{ subItem.authName }}</span>
                    </template>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "Nav",
    data() {
        return {
            isCollapse: true,
            count: 0,
            // 被激活地址
            activePath: "",
            iconsObj: {
                1: "el-icon-s-marketing",
                2: "el-icon-office-building",
            },
            allData: [
                {
                    id: 1,
                    path: "alldata",
                    authName: "数据图表",
                    children: [
                        { id: 11, path: "alldata", authName: "统计数据" },
                        { id: 12, path: "allconfirmed", authName: "累计图表" },
                        { id: 13, path: "newconfirmed", authName: "新增图表" },
                    ],
                },
                {
                    id: 2,
                    path: "anhui",
                    authName: "区域数据",
                    children: [
                        { id: 21, path: "anhui", authName: "安徽" },
                        { id: 22, path: "aomen", authName: "澳门" },
                        { id: 23, path: "beijing", authName: "北京" },
                        { id: 24, path: "chongqing", authName: "重庆" },
                        { id: 25, path: "fujian", authName: "福建" },
                        { id: 26, path: "gansu", authName: "甘肃" },
                        { id: 27, path: "guangdong", authName: "广东" },
                        { id: 28, path: "guangxi", authName: "广西" },
                        { id: 29, path: "guizhou", authName: "贵州" },
                        { id: 210, path: "hainan", authName: "海南" },
                        { id: 211, path: "hebei", authName: "河北" },
                        { id: 212, path: "heilongjiang", authName: "黑龙江" },
                        { id: 213, path: "henan", authName: "河南" },
                        { id: 214, path: "hubei", authName: "湖北" },
                        { id: 215, path: "hunan", authName: "湖南" },
                        { id: 216, path: "jiangsu", authName: "江苏" },
                        { id: 217, path: "jiangxi", authName: "江西" },
                        { id: 218, path: "jilin", authName: "吉林" },
                        { id: 219, path: "liaoning", authName: "辽宁" },
                        { id: 220, path: "neimenggu", authName: "内蒙古" },
                        { id: 221, path: "ningxia", authName: "宁夏" },
                        { id: 222, path: "qinghai", authName: "青海" },
                        { id: 223, path: "shandong", authName: "山东" },
                        { id: 224, path: "shanghai", authName: "上海" },
                        { id: 225, path: "shanxi", authName: "陕西" },
                        { id: 226, path: "shanxizizhiqu", authName: "山西" },
                        { id: 227, path: "sichuan", authName: "四川" },
                        { id: 228, path: "taiwan", authName: "台湾" },
                        { id: 229, path: "tianjin", authName: "天津" },
                        { id: 230, path: "xianggang", authName: "香港" },
                        { id: 231, path: "xinjiang", authName: "新疆" },
                        { id: 232, path: "xizang", authName: "西藏" },
                        { id: 233, path: "yunnan", authName: "云南" },
                        { id: 234, path: "zhejiang", authName: "浙江" },
                    ],
                },
            ],
        };
    },
    methods: {
        load() {
            this.count += 2;
        },
        handleOpen(key, keyPath) {
            window.sessionStorage.setItem("activePath", keyPath);
            this.activePath = window.sessionStorage.getItem("activePath");
        },
        handleClose(key, keyPath) {
            window.sessionStorage.setItem("activePath", keyPath);
            this.activePath = window.sessionStorage.getItem("activePath");
        },
        // 保存连接的激活状态
        saveNavState(activePath) {
            window.sessionStorage.setItem("activePath", activePath);
            this.activePath = window.sessionStorage.getItem("activePath");
        },
        handleScroll(e) {
            if (
                e.srcElement.scrollTop + e.srcElement.offsetHeight >=
                e.srcElement.scrollHeight
            ) {
                console.log("到底了");
            }
        },
    },
    created() {
        this.activePath = window.sessionStorage.getItem("activePath");
    },
    beforeCreate() {
        this.activePath = window.sessionStorage.getItem("activePath");
    },
};
</script>

<style lang="less">
#logoBox {
    width: 10vw;
    height: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    img {
        width: 20px;
        height: 20px;
    }
    h3{
        color: #ffffff;
        font-size: 16px;
    }
}
#Nav {
    position: fixed;
    width: 10vw;
    height: 100%;
}
#elmenu {
    border: none;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
#elmenu::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #555;
}

/*定义滚动条轨道 内阴影+圆角*/
#elmenu::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #555;
}

/*定义滑块 内阴影+圆角*/
#elmenu::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
}
.el-menu {
    min-width: 160px;
    z-index: 9999;
    overflow: hidden;
    border: none;
}
.el-submenu {
    min-width: 160px;
    z-index: 9999;
}
.el-submenu > .scrollbar {
    max-height: 600px;
}
.router-link {
    color: #fff;
}
.el-menu-item a {
    color: #fff;
}
.el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>
