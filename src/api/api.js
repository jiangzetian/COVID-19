import Vue from 'vue'
import VueJsonp from 'vue-jsonp';
import axios from 'axios'

Vue.use(VueJsonp);
export function chinaData() {
    return axios({
        method: 'get',
        url: 'g2/getOnsInfo?name=wuwei_ww_global_vars',
    })
}
export function cityData() {
    return axios({
        method: 'get',
        url: 'g2/getOnsInfo?name=wuwei_ww_area_counts',
    })
}
export function chinaDayData() {
    return axios({
        method: 'get',
        url: 'g2/getOnsInfo?name=wuwei_ww_cn_day_counts',
    })
}
