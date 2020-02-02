import Vue from 'vue'
import Vuex from 'vuex'
import VueJsonp from 'vue-jsonp';
Vue.use(Vuex);
Vue.use(VueJsonp);
const store = new Vuex.Store({
    state: {
        count: 0,
        all:{},
        area:{}
    },
    mutations: {
        changeAll(state, obj){
            state.all = obj
        },
        changeArea(state, obj){
            state.area = obj
        }
    },
    actions: {
    }
});

export default store;
