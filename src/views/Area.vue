<template>
    <div>
        <van-tabs swipeable>
            <van-tab v-for="v in map_data" :key="v.name" :title="v.name">
                <van-row>
                    <van-col span="12">
                        <div class="box confirmCount">
                            <p>{{v.confirm}}</p>
                            <p>{{v.name}}确诊</p>
                        </div>
                    </van-col>
                    <van-col span="12">
                        <div class="box suspectCount">
                            <p>{{v.suspect}}</p>
                            <p>{{v.name}}疑似</p>
                        </div>
                    </van-col>
                    <van-col span="12">
                        <div class="box cure">
                            <p>{{v.heal}}</p>
                            <p>{{v.name}}治愈</p>
                        </div>
                    </van-col>
                    <van-col span="12">
                        <div class="box deadCount">
                            <p>{{v.dead}}</p>
                            <p>{{v.name}}死亡</p>
                        </div>
                    </van-col>
                </van-row>
            </van-tab>
        </van-tabs>
        <div id="chart1" class="chart"></div>
        <div id="chart2" class="chart"></div>
        <div id="chart3" class="chart"></div>
    </div>
</template>

<script>
    export default {
        name: "Area",
        data(){
            return {
                map_data:{},
            }
        },
        methods: {
            getData() {
                this.$jsonp('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5').then((res) => {
                    let data = JSON.parse(res.data);
                    this.map_data=this.mapAreaData(data.areaTree[0].children);
                    this.setChart(this.map_data);
                }).catch((error) => {
                    console.log(error)
                });
            },
            mapAreaData(data) {
                // console.log(data);
                let data_arr=[];
                for (let i=0;i<data.length;i++){
                    data[i]['confirm']=data[i].total.confirm;
                    data[i]['suspect']=data[i].total.suspect;
                    data[i]['heal']=data[i].total.heal;
                    data[i]['dead']=data[i].total.dead;
                }
                data.sort(function(a, b) {
                    if(a.value !== b.confirm){
                        return b.confirm - a.confirm;
                    }else{
                        return b.confirm - a.confirm;
                    }
                });
                return data;
            },
            setChart(data){
                let area_data_confirm=[];
                let area_data_heal=[];
                let area_data_dead=[];
                for (let i = 0; i <data.length; i++) {
                    area_data_confirm.push([
                        data[i].name,
                        data[i].confirm
                    ]);
                    area_data_heal.push([
                        data[i].name,
                        data[i].heal
                    ]);
                    area_data_dead.push([
                        data[i].name,
                        data[i].dead
                    ])
                }
                let Highcharts = require('highcharts/highmaps');
                var chart = Highcharts.chart('chart1', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: '各省确诊人数统计'
                    },
                    plotOptions :{
                        column: {
                            dataLabels: {
                                enabled: true //设置显示对应y的值
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        labels: {
                            rotation: -90// 设置轴标签旋转角度
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: ''
                        }
                    },
                    credits:{
                        enabled: false // 禁用版权信息
                    },
                    series: [{
                        name: '确诊人数',
                        data: area_data_confirm,
                    }],
                    colors: ['#D81D1B']
                });
                var chart = Highcharts.chart('chart2', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: '各省治愈人数统计'
                    },
                    plotOptions :{
                        column: {
                            dataLabels: {
                                enabled: true //设置显示对应y的值
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        labels: {
                            rotation: -90// 设置轴标签旋转角度
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: ''
                        }
                    },
                    credits:{
                        enabled: false // 禁用版权信息
                    },
                    series: [{
                        name: '治愈人数',
                        data: area_data_heal,
                    }],
                    colors: ['#178B50']
                });
                var chart = Highcharts.chart('chart3', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: '各省死亡人数统计'
                    },
                    plotOptions :{
                        column: {
                            dataLabels: {
                                enabled: true, //设置显示对应y的值
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        labels: {
                            rotation: -90// 设置轴标签旋转角度
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: ''
                        }
                    },
                    credits:{
                        enabled: false // 禁用版权信息
                    },
                    series: [{
                        name: '死亡人数',
                        data: area_data_dead,
                    }],
                    colors:['#2d2f33']
                });
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
    .box{
        padding: 5% 0;
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
    .chart{
        padding-bottom: 1%;
    }
    .text{
        font-size: 16px;
        text-align: center;
        line-height: 30px;
    }
    .confirm{
        color: #D81D1B;
    }
    .suspect{
        color: #F7AB1A;
    }
    .heal{
        color: #178B50;
    }
    .dead{
        color: #2d2f33;
    }
</style>
