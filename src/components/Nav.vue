<template>
    <div id="nav">
        <van-tabbar
                v-model="active"
                active-color="#178B50"
                inactive-color="#000"
                safe-area-inset-bottom
                route
        >
            <van-tabbar-item icon="star" to="/">全国</van-tabbar-item>
            <van-tabbar-item icon="fire" to="/area">各省</van-tabbar-item>
            <van-tabbar-item icon="like" to="/city">各市</van-tabbar-item>
            <van-tabbar-item icon="browsing-history" to="/stroke">行程查询</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        data(){
            return{
                active:0
            }
        }
    }
</script>

<style scoped>
</style>
