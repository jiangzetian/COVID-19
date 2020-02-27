<template>
    <div id="stroke">
        <van-loading size="24px" vertical v-if="stroke_data == ''">加载中...</van-loading>
        <van-tabs swipeable v-if="stroke_data !== ''">
            <van-tab v-for="(v,i) in types" :key="i" :title="v">
                <a class="box" v-for="vv in stroke_data" v-if="vv.t_type == i" :href="vv.source">
                    <van-row>
                        <van-col span="12"  class="text t_type">{{v}}</van-col >
                        <van-col span="12"  class="text t_date">{{vv.t_date}}</van-col>
                        <van-col span="24" class="text t_no">{{vv.t_no}}</van-col>
                        <van-col span="24" class="text t_pos">
                            {{vv.t_pos_start}}
                            —
                            {{vv.t_pos_end}}
                        </van-col>
                        <van-col span="24" class="text t_time">
                            {{formatDateTime(vv.t_start)}}
                            至
                            {{formatDateTime(vv.t_end)}}
                        </van-col>
                        <van-col span="24" class="text t_memo">{{vv.t_memo}}</van-col>
                        <van-col span="24" class="text t_no_sub">{{vv.t_no_sub}}</van-col>
                        <van-col span="24" class="text t_type">{{vv.who}}</van-col>
                        <van-col span="24" class="text created_at">
                            发布时间:{{formatDateTime(vv.created_at)}}
                        </van-col>
                    </van-row>
                </a>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        name: "Stroke",
        data(){
            return{
                stroke_data:'',
                types:{
                    1:'飞机',
                    2:'火车',
                    3:'地铁',
                    4:'长途大巴',
                    5:'公交',
                    6:'出租',
                    7:'轮船',
                    8:'其他公共场所',
                },
            }
        },
        methods:{
            getData(){
                this.$jsonp('http://api.tianxiaotian.xyz/es_show/api/stroke.php').then((res) => {
                    this.stroke_data=res.data;
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error)
                });
            },
            addZero(num) {
                return num < 10 ? '0' + num : num;
            },
            formatDateTime(date) {
                var time = new Date(Date.parse(date));
                time.setTime(time.setHours(time.getHours() + 8));
                var Y = time.getFullYear() + '-';
                var M = this.addZero(time.getMonth() + 1) + '-';
                var D = this.addZero(time.getDate()) + ' ';
                var h = this.addZero(time.getHours()) + ':';
                var m = this.addZero(time.getMinutes()) + ':';
                var  s = this.addZero(time.getSeconds());
                return Y + M + D + h+m+s;
            },
        },
        created() {
            this.getData();
        },
        mounted() {
        }
    }
</script>

<style scoped>
    a,a:hover{
        color: #000;
    }
    .box{
        display: block;
        margin:2% auto;
        padding: 2%;
        width: 95%;
        border: 1px solid #ccc;
        border-radius: 15px;
    }
    .text{
        text-align: center;
        line-height: 25px;
    }
    .t_no,.t_pos{
        font-size: 18px;
        font-weight: 700;
        line-height: 35px;
    }
    .t_pos{

    }
    .t_time{
        font-size: 16px;
        font-weight: 700;
        line-height: 35px;
    }
</style>
