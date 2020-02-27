<template>
    <div id="head">
        <div class="banner">
            <p>新型冠状病毒肺炎</p>
            <h1>疫情数据实时分析显示</h1>
        </div>
        <van-row>
            <van-col span="12">
                <div class="box confirmCount">
                    <p>{{head_data.confirm}}</p>
                    <p>全国确诊</p>
                </div>
            </van-col>
            <van-col span="12">
                <div class="box suspectCount">
                    <p>{{head_data.suspect}}</p>
                    <p>全国疑似</p>
                </div>
            </van-col>
            <van-col span="12">
                <div class="box cure">
                    <p>{{head_data.heal}}</p>
                    <p>全国治愈</p>
                </div>
            </van-col>
            <van-col span="12">
                <div class="box deadCount">
                    <p>{{head_data.dead}}</p>
                    <p>全国死亡</p>
                </div>
            </van-col>
        </van-row>
        <div id="map"></div>
        <div id="chart"></div>
    </div>
</template>

<script>
    //中国地图数据
    import china from '@/common/china.js'
    export default {
        name: "China",
        data(){
            return{
                head_data:{},
                map_data:{},
                chart_data:{},
            }
        },
        methods: {
            getData() {
                this.$jsonp('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5').then((res) => {
                    let data = JSON.parse(res.data);
                    // console.log(data);

                    //顶部显示疫情数字
                    this.head_data= data.chinaTotal;
                    //地图
                    this.map_data=this.mapAreaData(data.areaTree[0].children);
                    this.setMap(this.map_data);
                }).catch((error) => {
                    console.log(error)
                });
                this.$jsonp('https://view.inews.qq.com/g2/getOnsInfo?name=disease_other').then((res) => {
                    let data = JSON.parse(res.data);
                    // console.log(data);
                    //曲线图
                    this.chart_data=data.chinaDayList;
                    this.setChart(this.chart_data);
                }).catch((error) => {
                    console.log(error)
                });
            },
            mapAreaData(data) {
                let data_arr=[];
                for (let i=0;i<data.length;i++){
                    data[i]['value']=data[i].total.confirm;
                }
                data.sort(function(a, b) {
                    if (a.value !== b.value) {
                        return b.value - a.value;
                    } else {
                        return b.value - a.value;
                    }
                });
                return data;
            },
            setMap(data){
                var Highcharts = require('highcharts/highmaps');
                // 初始化图表
                var map = new Highcharts.Map('map', {
                    title: {
                        text: '中国疫情地图'
                    },
                    colorAxis: {
                        minColor: '#FFE6BE',
                        maxColor: '#f00',
                        dataClasses: [{
                            to: 0
                        }, {
                            from: 0,
                            to: 100
                        }, {
                            from:100,
                            to: 1000
                        }, {
                            from: 1000,
                            to: 10000
                        }, {
                            from: 10000
                        }]
                    },
                    series: [{
                        data: data,
                        name: '确诊人数',
                        mapData:china,
                        joinBy:'name'// 根据 name 属性进行关联
                    }],
                    credits:{
                        enabled: false // 禁用版权信息
                    },
                });
            },
            setChart(data){
                data=data.sort(function (a, b) {
                    return a.date- b.date;
                });
                var confirms = [];
                var deads = [];
                let suspects=[];
                let heals=[];
                var dates=[];
                for (let i=0;i<data.length;i++){
                    confirms.push(parseInt(data[i].confirm));
                    deads.push(parseInt(data[i].dead));
                    suspects.push(parseInt(data[i].suspect));
                    heals.push(parseInt(data[i].heal));
                    dates.push(data[i].date);
                }
                var Highcharts = require('highcharts/highmaps');
                var chart = Highcharts.chart('chart', {
                    title: {
                        text: '全国疫情发展曲线图'
                    },
                    subtitle:{
                        text:'点击下方图例可隐藏对应曲线'
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        crosshair:{

                        }
                    },
                    xAxis: {
                        title: {
                            text: '日期'
                        },
                        categories:dates,
                    },
                    legend: {
                        align: 'center',
                        verticalAlign: 'top'
                    },
                    series: [
                        {name: '确诊人数', data:confirms},
                        {name: '疑似人数', data:suspects},
                        {name: '治愈人数', data:heals},
                        {name: '死亡人数', data:deads},
                        ],
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'top'
                        }
                    },
                    credits:{
                        enabled: false // 禁用版权信息
                    },
                    colors: ['#D81D1B','#F7AB1A','#178B50','#2d2f33']
                });
            }
        },
        created() {
            this.getData();
        },
        mounted(){
        },
        updated(){
        }
    }
</script>

<style scoped>
    #head{
        width: 100%;
        height: 100%;
    }
    .banner{
        width: 100%;
        height:auto;
        text-align: center;
        padding: 10% 0;
        background: #061E94;
        color: #fff;
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
    #map,#chart{
        margin: 0 auto;
        padding-bottom: 15%;
    }
</style>
