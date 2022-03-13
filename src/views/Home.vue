<template>
    <div class="home">
       <div class="Nav"><Nav></Nav></div>
       <div class="container">
           <div class="header"><Header></Header></div>
           <div class="main"><router-view></router-view></div>
       </div>
    </div>
</template>

<script>
import Nav from "../components/nav.vue";
import Header from "../components/Header.vue";

export default {
    name: "Home",
    components: { Nav, Header },
};
</script>

<style lang="less">
.home{
    display: flex;
    .Nav{
        width: 10vw;
        height: 100vh;
        min-width: 8vw;
    }
    .header{
        height: 15vh;
    }
    .container{
        width: 90vw;
        height: 85vh;
    }
}
</style>
