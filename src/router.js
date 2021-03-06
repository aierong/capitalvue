import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store/store.js'

import * as constant from '@/common/constant.js'
import * as Cookies from 'js-cookie'

Vue.use( Router )

const router = new Router( {
    mode : 'history' ,
    base : process.env.BASE_URL ,
    routes : [

        {
            path : '/login' ,
            name : 'login' ,
            component : () => import( '@/views/Login.vue') ,

        } ,
        {
            path : '/register' ,
            name : 'register' ,
            component : () => import( '@/views/Register.vue') ,

        } ,

        {
            path : '/myindexpage' ,
            name : 'myindexpage' ,
            component : () => import('@/views/MyIndexPage.vue') ,

        } ,
        {
            path : '/querydata' ,
            name : 'querydata' ,
            component : () => import('@/views/QueryData.vue') ,

        } ,
        {
            path : '/setupdata' ,
            name : 'setupdata' ,
            component : () => import('@/views/SetupData.vue') ,

        } ,
        {
            path : '/cz' ,
            name : 'cz' ,
            component : () => import('@/views/CZ.vue') ,

        } ,

        {
            path : '/addcapital' ,
            name : 'addcapital' ,
            component : () => import('@/views/CZ/addcapital.vue') ,

        } ,
        {
            path : '/movecapital' ,
            name : 'movecapital' ,
            component : () => import('@/views/CZ/movecapital.vue') ,

        } ,
        {
            path : '/salecapital' ,
            name : 'salecapital' ,
            component : () => import('@/views/CZ/salecapital.vue') ,

        } ,
        {
            path : '/scrapcapital' ,
            name : 'scrapcapital' ,
            component : () => import('@/views/CZ/scrapcapital.vue') ,

        } ,
        {
            path : '' ,
            redirect : '/myindexpage' ,

        } ,
    ]
} )

router.beforeEach( ( to , from , next ) => {

    if ( to.path == '/login' || to.path == '/register' ) {

        next();
    }
    else {

        //let data = Cookies.getJSON( constant.MyVuePersistedName.LoginInfoName );
        //是存的一个对象,这里我们取对象
        let data = Cookies.getJSON( constant.MyVuePersistedName.LoginUserId );

        // console.log( 'data' , data )
        //let isLogin = data ? true : false;
        let isLogin = false;

        if ( data && data.loginuserid && store.state.loginuser != null ) {
            //有可能没有loginuser 判断一下

            isLogin = true;

        }

        // console.log( 'beforeEach' , data , data.loginuserid , isLogin , store.state , store.state.loginuser )

        //没有登录，就转向登录页
        isLogin ? next() : next( '/login' );
    }
} );

export default router
