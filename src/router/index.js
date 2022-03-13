import Vue from 'vue'
import VueRouter from 'vue-router'
import ChinaMap from '../components/HomeMap.vue'
import Anhui from '../components/maps/anhui.vue'
import Aomen from '../components/maps/aomen.vue'
import Beijing from '../components/maps/beijing.vue'
import Chongqing from '../components/maps/chongqing.vue'
import Fujian from '../components/maps/fujian.vue'
import Gansu from '../components/maps/gansu.vue'
import Guangdong from '../components/maps/guangdong.vue'
import Guangxi from '../components/maps/guangxi.vue'
import Guizhou from '../components/maps/guizhou.vue'
import Hainan from '../components/maps/hainan.vue'
import Hebei from '../components/maps/hebei.vue'
import Heilongjiang from '../components/maps/heilongjiang.vue'
import Henan from '../components/maps/henan.vue'
import Hubei from '../components/maps/hubei.vue'
import Hunan from '../components/maps/hunan.vue'
import Jiangsu from '../components/maps/jiangsu.vue'
import Jiangxi from '../components/maps/jiangxi.vue'
import Jilin from '../components/maps/jilin.vue'
import Liaoning from '../components/maps/liaoning.vue'
import Neimenggu from '../components/maps/neimenggu.vue'
import Ningxia from '../components/maps/ningxia.vue'
import Qinghai from '../components/maps/qinghai.vue'
import Shandong from '../components/maps/shandong.vue'
import Shanghai from '../components/maps/shanghai.vue'
import Shanxi from '../components/maps/shanxi.vue'
import Shanxizizhiqu from '../components/maps/shanxizizhiqu.vue'
import Sichuan from '../components/maps/sichuan.vue'
import Taiwan from '../components/maps/taiwan.vue'
import Tianjin from '../components/maps/tianjin.vue'
import Xianggang from '../components/maps/xianggang.vue'
import Xinjiang from '../components/maps/xinjiang.vue'
import Xizang from '../components/maps/xizang.vue'
import Yunnan from '../components/maps/yunnan.vue'
import Zhejiang from '../components/maps/zhejiang.vue'
import AllConfirmed from '../components/tables/AllConfirmed.vue'
import AllData from '../components/tables/AllData.vue'
import NewConfirmed from '../components/tables/NewConfirm.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect:"/ChinaMap",
        children: [
            {
                path: '/ChinaMap',
                component: ChinaMap,
            },
            {
                path: '/alldata',
                component: AllData,
            },
            {
                path: '/allconfirmed',
                component: AllConfirmed,
            },
            {
                path: '/AllConfirmed',
                component: AllConfirmed,
            },
            {
                path: '/newconfirmed',
                component: NewConfirmed,
            },
            {
                path: '/anhui',
                component: Anhui,
            },
            {
                path: '/aomen',
                component: Aomen,
            },
            {
                path: '/beijing',
                component:Beijing ,
            },
            {
                path: '/chongqing',
                component: Chongqing,
            },
            {
                path: '/fujian',
                component: Fujian,
            },
            {
                path: '/gansu',
                component:Gansu,
            },
            {
                path: '/guangdong',
                component:Guangdong,
            },
            {
                path: '/guangxi',
                component:Guangxi,
            },
            {
                path: '/guizhou',
                component:Guizhou,
            },
            {
                path: '/hainan',
                component:Hainan,
            },
            {
                path: '/hebei',
                component:Hebei,
            },
            {
                path: '/heilongjiang',
                component:Heilongjiang,
            },
            {
                path: '/henan',
                component:Henan,
            },
            {
                path: '/hubei',
                component:Hubei,
            },
            {
                path: '/hunan',
                component:Hunan,
            },
            {
                path: '/jiangsu',
                component:Jiangsu,
            },
            {
                path: '/jiangxi',
                component:Jiangxi,
            },
            {
                path: '/jilin',
                component:Jilin,
            },
            {
                path: '/liaoning',
                component:Liaoning,
            },
            {
                path: '/neimenggu',
                component: Neimenggu,
            },
            {
                path: '/ningxia',
                component: Ningxia,
            },
            {
                path: '/qinghai',
                component:Qinghai,
            },
            {
                path: '/shandong',
                component: Shandong,
            },
            {
                path: '/shanghai',
                component: Shanghai,
            },
            {
                path: '/shanxi',
                component: Shanxi,
            },
            {
                path: '/shanxizizhiqu',
                component:Shanxizizhiqu ,
            },
            {
                path: '/sichuan',
                component: Sichuan,
            },
            {
                path: '/taiwan',
                component: Taiwan,
            },
            {
                path: '/tianjin',
                component: Tianjin,
            },
            {
                path: '/xianggang',
                component: Xianggang,
            },
            {
                path: '/xinjiang',
                component:Xinjiang ,
            },
            {
                path: '/xizang',
                component: Xizang,
            },
            {
                path: '/yunnan',
                component: Yunnan,
            },
            {
                path: '/zhejiang',
                component: Zhejiang,
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to       将要访问路径
    // form     从哪个路径调转而来
    // next     放行函数
    // next()   放行    next('/login')  强制跳转
    // if (to.path == "/login") return next();
    // 获取token
    // const tokenStr = window.sessionStorage.getItem("token");
    // if (!tokenStr) return next("/login");
    next();
});
export default router
