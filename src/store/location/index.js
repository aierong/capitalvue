/*
 作者: chenghao
 Date: 2019/9/21
 Time: 21:00
 功能: js脚本
 */

import getters from '@/store/location/getters.js'

import mutations from '@/store/location/mutations.js'

const state = {

    location : {} ,

    address : '' ,

}

export default {
    state : state ,

    getters : getters ,
    mutations : mutations ,

    //打开 命名空间
    namespaced : true
}
