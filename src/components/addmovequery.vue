<!--
作者:chenghao
Date: 2019/9/3
Time: 9:35
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-dropdown-menu>
            <!--            value	当前选中项对应的 value -->
            <!--            options	选项数组	Array	 -->
            <!--            <van-dropdown-item v-model="CapitalTypeItemVal"-->
            <!--                               :options="optionitemCapitalType"/>-->
            <van-dropdown-item v-model="MyItemVal"
                               :options="optionitemMy"/>

            <!--            <van-dropdown-item v-model="CapitalStatusVal"-->
            <!--                               :options="optionitemCapitalStatus"/>-->
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
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    //引入 lodash
    import * as _ from "lodash"

    import * as globalconstant from '@/common/constant.js'
    import * as util from '@/common/util/util.js'
    import * as moveapi from '@/common/bmobapi/move.js'

    import detaildata from '@/components/detail/detaildata.vue'

    // 导入
    import { loginuserdatamix } from "@/mixin/loginuserdata.js"


    export default {
        name : "addmovequery" ,
        //导入混入对象 可以是多个,数组
        mixins : [

            loginuserdatamix ,

        ] ,
        //注册组件
        components : {

            detaildata ,

        } ,
        //数据模型
        data () {
            return {
                //资产列表
                capitallist : [] ,

                //全部和我的
                MyItemVal : '' ,
                optionitemMy : [] ,

                searchval : '' ,

                loadobj : {
                    isover : false ,
                    isshowdivider : false ,
                    isloading : false
                } ,
            }
        } ,
        //方法
        methods : {
            createoptionitem () {

                // this.optionitemCapitalType = util.GetCapitalTypeList( true );
                //
                // // this.optionitemCapitalStatus = util.GetCapitalStatus( true );
                // this.optionitemCapitalStatus = [
                //     {
                //         text : '正常' ,
                //         value : '正常'
                //     }
                // ]

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
            async initlist () {
                let initcount = 10;

                let list = await moveapi.getaddmovequerylistbyminid( 0 ,
                    initcount ,

                    this.MyItemVal ,

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

            this.createoptionitem();

        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./addmovequery.css">
</style>
