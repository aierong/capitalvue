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

    location : {} ,

    address : '' ,

    deptdata : null ,

    IsRefreshContactsList : true , // 标记是否刷新联系人列表页
}

//保存在cookie中
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

//保存在会话中
const vuexPersistedsession = createPersistedState( {
    //key是给持久化状态起个名字，默认:vuex
    key : 'MyCapitalPersistedSessionData' ,

    // window.sessionStorage 是存储在会话
    // window.localStorage   是本地存储
    storage : window.sessionStorage ,

    //reducer是设置要持久化的变量,不设置就是默认是全部变量

    reducer ( val ) {
        return {
            // 只储存state中的 deptdata

            deptdata : val.deptdata
        }
    }
} );

const vuexPersisted = createPersistedState( {
    //key是给持久化状态起个名字，默认:vuex
    key : 'MyCapitalPersistedData' ,

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

    plugins : [
        vuexPersisted ,
        vuexPersistedcookie ,
        vuexPersistedsession
    ] ,
} )
