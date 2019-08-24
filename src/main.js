import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/store.js'

import Bmob from "hydrogen-js-sdk";
// 初始化
Bmob.initialize( "5fa6c3b28a9e4494aaa1c140bfc0e5b0" , "59011ef8242bbe9eb364ffa6fe414360" );

// 挂载到全局使用
Vue.prototype.$Bmob = Bmob

//导入vant
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use( Vant );

//懒加载需要单独引入
import { Lazyload } from "vant";

Vue.use( Lazyload );

import VCharts from 'v-charts'

Vue.use( VCharts )

//src/components/global.js
import components from '@/components/global.js'
//循环注册全局组件
Object.keys( components ).forEach( ( key ) => {

    //注册全局组件
    Vue.component( `${ key }` , components[ key ] )
} )

Vue.config.productionTip = false

new Vue( {
    router ,
    store ,
    render : h => h( App )
} ).$mount( '#app' )
