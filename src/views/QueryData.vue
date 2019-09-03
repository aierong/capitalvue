<!--
作者:chenghao
Date: 2019/8/24
Time: 14:53
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-dropdown-menu>
            <!--            value	当前选中项对应的 value -->
            <!--            options	选项数组	Array	 -->
            <van-dropdown-item v-model="CapitalTypeItemVal"
                               :options="optionitemCapitalType"/>
            <van-dropdown-item v-model="MyItemVal"
                               :options="optionitemMy"/>
            <van-dropdown-item v-model="CapitalStatusVal"
                               :options="optionitemCapitalStatus"/>
        </van-dropdown-menu>
        <van-search placeholder="请输入搜索关键词"
                    v-model="searchval"
                    show-action
                    shape="round"
                    @search="onSearch">

            <div slot="action"
                 @click="onSearch">搜索
            </div>
        </van-search>

        <van-cell-group>
            <van-cell :key="_index"
                      v-for="(item,_index) in capitallist">
                <template slot="right-icon">
                    <van-icon @click="gotodetaildata(item)"
                              size="20px"
                              name="search"/>
                </template>
                <template slot="title">
                    <span @click="gotodetaildata(item)"
                          class="mycelltitle">{{ item  | formattitle }}</span>
                </template>
                <template slot="label">
                    <span>{{ item  | formatlabel }}</span>
                </template>
                <template slot="default">

                    <span v-bind:class="{ mycell: !IsNormal(item.capitalstatus) }">{{ item.capitalstatus }}</span>

                </template>
            </van-cell>
        </van-cell-group>

        <mytabbar></mytabbar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import dayjs from 'dayjs'

    //引入 lodash
    import * as _ from "lodash"

    import * as globalconstant from '@/common/constant.js'
    import * as util from '@/common/util/util.js'
    import * as dlapi from '@/common/bmobapi/dl.js'

    import detaildata from '@/components/detail/detaildata.vue'

    // 导入
    import { loginuserdatamix } from "@/mixin/loginuserdata.js"

    export default {
        name : "QueryData" ,
        //导入混入对象 可以是多个,数组
        mixins : [

            loginuserdatamix ,

        ] ,
        //注册组件
        components : {

            detaildata ,

        } ,
        //过滤器
        filters : {
            //
            formattitle : ( item ) => {

                return `${ item.capitalname }(${ item.capitalcode })`
            } ,
            formatlabel : ( item ) => {

                return `类型:${ item.typename } 保管人:${ item.saveman }`
            } ,
        } ,
        //数据模型
        data () {
            return {
                //资产列表
                capitallist : [] ,
                //资产类型
                CapitalTypeItemVal : '' ,
                optionitemCapitalType : [] ,

                //全部和我的
                MyItemVal : '' ,
                optionitemMy : [] ,

                CapitalStatusVal : '' ,
                optionitemCapitalStatus : [] ,

                searchval : '' ,

                loadobj : {
                    isover : false ,
                    isshowdivider : false ,
                    isloading : false
                } ,

                DlgObj : {

                    capitalcode : '' ,
                    nos : '' ,
                    notype : '' ,
                    tabindex : 0 ,
                    tempdata : ''
                } ,

                diaObj : {
                    isshow : false
                }
            }
        } ,
        //方法
        methods : {
            IsNormal ( capitalstatus ) {
                if ( capitalstatus ) {
                    return capitalstatus == globalconstant.CapitalStatus.normal;
                }
                return false;
            } ,
            createoptionitem () {

                this.optionitemCapitalType = util.GetCapitalTypeList( true );

                this.optionitemCapitalStatus = util.GetCapitalStatus( true );

                this.optionitemMy = [
                    {
                        text : '全部' ,
                        value : ''
                    } ,
                    {
                        text : '我登记的' ,
                        value : this.loginusermobile
                    }
                ]
            } ,
            onSearch () {
                this.initlist();
            } ,
            async loaddata () {
                let counts = 5;

                this.loadobj.isloading = true;

                let list = await dlapi.querybyminid( this.minautokey ,
                    counts ,
                    this.CapitalTypeItemVal ,
                    this.loginusermobile ,
                    this.CapitalStatusVal ,
                    this.searchval );

                setTimeout( () => {

                    this.loadobj.isloading = false;

                    // console.log( list );
                    let lens = 0;

                    if ( list != null && list.length > 0 ) {
                        lens = list.length;

                        this.capitallist.push( ...list )
                    }
                    else {
                        lens = 0;

                    }

                    if ( lens < counts ) {
                        this.loadobj.isover = true;
                        this.loadobj.isshowdivider = true;
                    }
                    else {
                        this.loadobj.isover = false;
                        this.loadobj.isshowdivider = false;
                    }
                } , 2000 );

            } ,
            async initlist () {
                let initcount = 10;

                let list = await dlapi.querybyminid( 0 ,
                    initcount ,
                    this.CapitalTypeItemVal ,
                    this.loginusermobile ,
                    this.CapitalStatusVal ,
                    this.searchval );

                // console.log( list );
                let lens = 0;
                if ( list != null && list.length > 0 ) {
                    lens = list.length;

                    this.capitallist = list;
                }
                else {
                    lens = 0;

                    this.capitallist = [];
                }

                if ( lens < initcount ) {
                    this.loadobj.isover = true;
                    this.loadobj.isshowdivider = false;
                }
                else {
                    this.loadobj.isover = false;
                    this.loadobj.isshowdivider = false;
                }

            } ,
        } ,
        //计算属性
        computed : {
            /**
             * 得列表中最小的autokey
             * @returns {number|*}
             */
            minautokey () {
                if ( this.listcounts > 0 ) {
                    let obj = _.minBy( this.capitallist , ( val ) => {
                        return val.autokey;
                    } )

                    return obj.autokey;
                }

                return 0;
            } ,
            /**
             * 列表中记录数量
             * @returns {number|*}
             */
            listcounts () {
                if ( this.capitallist != null && this.capitallist.length > 0 ) {
                    return this.capitallist.length;
                }

                return 0;
            } ,
        } ,
        //生命周期(mounted)
        mounted () {
            // console.log('QueryData mounted')

            this.createoptionitem();

            this.initlist();

        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./QueryData.css">
</style>
