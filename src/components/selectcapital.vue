<!--
作者:chenghao
Date: 2019/8/27
Time: 14:53
功能:
-->

<!-- html代码片段 -->

<!-- 选择资产 -->
<template>

    <div>
        <van-action-sheet style="height: 78%"
                          v-model="diaObj.isshow"
                          title="选择正常状态资产">
            <van-dropdown-menu>

                <van-dropdown-item v-model="CapitalTypeItemVal"
                                   :options="optionitemCapitalType"/>
                <van-dropdown-item v-model="MyItemVal"
                                   :options="optionitemMy"/>
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
                        <van-icon @click="itemclick(item)"
                                  color="red"
                                  size="20px"
                                  name="certificate"/>
                    </template>
                    <template slot="title">

                        <span v-bind:class="{ mycell: ismy(item.userid) }">{{ item | formattitle }}</span>

                    </template>
                    <template slot="label">
                        <span v-bind:class="{ mycell: ismy(item.userid) }">{{ item | formatlabel }}</span>

                    </template>
                </van-cell>

            </van-cell-group>
            <br>
            <br>
            <van-divider v-if="!loadobj.isover">
                <template slot="default">
                    <van-button :loading="loadobj.isloading"
                                @click="loaddata"
                                size="small"
                                icon="replay"
                                color="#7232dd"
                                plain
                                round
                                loading-type="spinner"
                                loading-text="加载中...">点我加载更多
                    </van-button>
                </template>
            </van-divider>
            <van-divider dashed
                         v-if="loadobj.isshowdivider">我是有底线的
            </van-divider>
        </van-action-sheet>
        <br>
        <br><br>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    //引入 lodash
    import * as _ from "lodash"

    import * as globalconstant from '@/common/constant.js'
    import * as  dlapi from '@/common/bmobapi/dl.js'
    import * as util from '@/common/util/util.js'

    // 导入
    import { loginuserdatamix } from "@/mixin/loginuserdata.js"

    export default {
        name : "selectcapital" ,
        props : {
            diaObj : Object
        } ,
        //导入混入对象 可以是多个,数组
        mixins : [

            loginuserdatamix ,

        ] ,
        //过滤器
        filters : {
            //
            formattitle : ( item ) => {

                return `${ item.capitalname }(${ item.capitalcode })`
            } ,
            formatlabel : ( item ) => {

                return `类型:${ item.typename } 保管人:${ item.saveman } `
            } ,
        } ,
        //数据模型
        data () {
            return {
                //资产列表
                capitallist : [] ,
                searchval : '' ,

                CapitalTypeItemVal : '' ,
                //资产类型
                optionitemCapitalType : [] ,
                MyItemVal : '' ,
                //全部和我的
                optionitemMy : [] ,

                loadobj : {
                    isover : false ,
                    isshowdivider : false ,
                    isloading : false
                } ,

            }
        } ,
        //方法
        methods : {
            ismy ( userid ) {
                if ( userid ) {
                    return userid == this.loginusermobile;
                }
                return false;
            } ,

            createoptionitem () {

                this.optionitemCapitalType = util.GetCapitalTypeList( true );

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
            itemclick ( item ) {
                // 选择确定事件 ,把选择好的资产传递回去
                this.$emit( "selectcapital" ,
                    // item.capitalcode , item.capitalname , item.objectId
                    item );

                return;
            } ,
            async initlist () {
                //初始化 先搞4个
                let initcount = 4;

                let list = await dlapi.getnormalcapitallistbyminid( 0 ,
                    initcount ,
                    this.CapitalTypeItemVal ,
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
            async loaddata () {
                // 每次搞2个
                let counts = 2;

                this.loadobj.isloading = true;

                let list = await dlapi.getnormalcapitallistbyminid( this.minautokey ,
                    counts ,
                    this.CapitalTypeItemVal ,
                    this.MyItemVal ,
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
            onSearch () {
                this.initlist();
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

            this.initlist();
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./selectcapital.css"
       scoped>
</style>
