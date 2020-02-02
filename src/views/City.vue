<template>
    <div id="city">
        <van-tabs>
            <van-tab v-for="v in map_data" :key="v.name" :title="v.name">
                <van-tabs>
                    <van-tab v-for="vv in v.children" :key="v.city" :title="vv.name">
                            <van-row>
                            <van-col span="12">
                                <div class="box confirmCount">
                                    <p>{{vv.total.confirm}}</p>
                                    <p>{{vv.name}}确诊</p>
                                </div>
                            </van-col>
                            <van-col span="12">
                                <div class="box suspectCount">
                                    <p>{{vv.total.suspect}}</p>
                                    <p>{{vv.name}}疑似</p>
                                </div>
                            </van-col>
                            <van-col span="12">
                                <div class="box cure">
                                    <p>{{vv.total.heal}}</p>
                                    <p>{{vv.name}}治愈</p>
                                </div>
                            </van-col>
                            <van-col span="12">
                                <div class="box deadCount">
                                    <p>{{vv.total.dead}}</p>
                                    <p>{{vv.name}}死亡</p>
                                </div>
                            </van-col>
                            </van-row>
                    </van-tab>
                </van-tabs>
            </van-tab>
        </van-tabs>
        <div class="copy">
            <img src="../assets/gzh_code.jpg" class="logo">
            <p class="text">对你有帮助或者问题反馈请关注公众号</p>
            <p class="text">此网页不参与商业用途</p>
        </div>
    </div>
</template>

<script>
    import {cityData} from '@/api/api';
    export default {
        name: "City",
        data(){
            return{
                map_data:{},
            }
        },
        methods: {
            getData() {
                this.$jsonp('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5').then((res) => {
                    let data = JSON.parse(res.data);
                    this.map_data=this.mapAreaData(data.areaTree[0].children);
                }).catch((error) => {
                    console.log(error)
                });
            },
            mapAreaData(data) {
                let data_arr=[];
                for (let i=0;i<data.length;i++){
                    data[i]['confirm']=data[i].total.confirm;
                    data[i]['suspect']=data[i].total.suspect;
                    data[i]['heal']=data[i].total.heal;
                    data[i]['dead']=data[i].total.dead;
                }
                data.sort(function(a, b) {
                    if (a.confirm !== b.confirm) {
                        return b.confirm - a.confirm;
                    } else {
                        return b.confirm - a.confirm;
                    }
                });
                return data;
            }
        },
        created() {
            this.getData();
        },
        mounted() {
        }
    }
</script>

<style scoped>
    #city{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .box p:first-child{
        text-align: center;
        font-size: 33px;
        font-weight: 800;
    }
    .box p:last-child{
        text-align: center;
        font-size: 22px;
    }
    .confirmCount{
        color: #D81D1B;
    }
    .suspectCount{
        color: #F7AB1A;
    }
    .cure{
        color: #178B50;
    }
    .deadCount{
        color: #2d2f33;
    }
    .copy{
        position: absolute;
        bottom: 10%;
        left: 0;
        right: 0;
        margin: auto;
    }
    .logo{
        display: block;
        margin: 0 auto;
        width: 40%;
        height: auto;
        max-width: 200px;
    }
    .text{
        text-align: center;
        color: #ccc;
    }
</style>
