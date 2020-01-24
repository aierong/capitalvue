import Vue from 'vue'
import App from './App.vue'
import store from '@/store/store.js'
import router from './router'

// import Bmob from "hydrogen-js-sdk";

// 初始化
// 旧版本的： Bmob.initialize("你的Application ID", "你的REST API Key");
// Bmob.initialize( "5fa6c3b28a9e4494aaa1c140bfc0e5b0" , "59011ef8242bbe9eb364ffa6fe414360" );

import Bmob from "hydrogen-js-sdk";
//          Bmob.initialize("你的Secret Key", "你的API 安全码");
//初始化 新版本(2.0以上版本):   Bmob.initialize("你的Secret Key", "你的API 安全码");
// API 安全码: 在应用功能设置，安全验证，API安全码自己进行设置
Bmob.initialize( "6c5cee55bfe8e3b1" , "123abc" );

// 挂载到全局使用
Vue.prototype.$Bmob = Bmob

//导入vant
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use( Vant );

//按需加载
import VeBar from 'v-charts/lib/bar.common'

Vue.component( VeBar.name , VeBar )

// //注册全局组件
import components from '@/components/globalcomponents.js'
//循环注册全局组件
Object.keys( components ).forEach( ( key ) => {

    //注册全局组件
    Vue.component( `${ key }` , components[ key ] )

} )

import VeeValidate from 'vee-validate';

Vue.use( VeeValidate );

Vue.config.productionTip = false

new Vue( {
    router ,
    store ,
    render : h => h( App )
} ).$mount( '#app' )


