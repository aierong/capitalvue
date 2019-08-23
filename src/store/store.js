import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import * as constant from '@/common/constant.js'

import mutations from './mutations'
import getters from './getters'

Vue.use( Vuex )

const state = {
    //登录用户帐号
    loginuserid : '' ,

    //登录用户信息
    loginuser : null ,

    IsRefreshContactsList : true , // 标记是否刷新联系人列表页

    location : {} ,

    address : ''
}

const vuexPersistedcookie = createPersistedState( {
    //key是给持久化状态起个名字
    key : constant.MyVuePersistedName.LoginUserId ,

    storage : {
        getItem : key => Cookies.get( key ) ,

        setItem : ( key , value ) => Cookies.set( key , value , {
            expires : constant.CookieExpires
        } ) ,

        removeItem : key => Cookies.remove( key ) ,
    } ,

    //reducer是设置要持久化的变量,不设置就是默认是全部变量

    reducer ( val ) {
        return {
            // 只储存state中的loginuserid
            loginuserid : val.loginuserid

        }
    }
} );

const vuexPersisted = createPersistedState( {
    //key是给持久化状态起个名字，默认:vuex
    key : 'MyWxPersistedData' ,

    storage : window.localStorage ,

    //reducer是设置要持久化的变量,不设置就是默认是全部变量

    reducer ( val ) {
        return {
            // 只储存state中的

            location : val.location ,
            address : val.address ,

            loginuser : val.loginuser ,

            IsRefreshContactsList : val.IsRefreshContactsList

        }
    }
} );

export default new Vuex.Store( {
    state ,

    // actions ,
    mutations ,

    getters ,

    plugins : [ vuexPersisted , vuexPersistedcookie ] ,
} )
