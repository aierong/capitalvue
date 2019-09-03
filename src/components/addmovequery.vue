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

        <van-cell-group>
            <van-cell :key="_index"
                      v-for="(item,_index) in capitallist">
                <template slot="right-icon">
                    <van-icon @click="gotodetaildata(item)"
                              size="20px"
                              name="search"/>
                </template>
                <template slot="title">
                    <span>{{ item  | formattitle }}</span>
                </template>
                <template slot="label">
                    <span>{{ item  | formatlabel }}</span>
                    <br>
                    <span>{{ item.movedate }}</span>
                </template>
                <template slot="default">

                    <!--                    <span v-bind:class="{ mycell: !IsNormal(item.capitalstatus) }">{{ item.capitalstatus }}</span>-->
                    <span>{{ item.movename }}</span>
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

        <van-action-sheet ref='c1'
                          style="height: 86%"
                          v-model="diaObj.isshow"
                          title="资产信息">
            <detaildata ref='c2'
                        :diaObj="DlgObj"></detaildata>
        </van-action-sheet>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import dayjs from 'dayjs'

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
        //过滤器
        filters : {
            //
            formattitle : ( item ) => {

                return `${ item.nos }(${ item.username })`
            } ,
            formatlabel : ( item ) => {

                return `${ item.capitalcode }(${ item.capitalname })`
            } ,
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

                DlgObj : {

                    capitalcode : '' ,
                    nos : '' ,
                    notype : globalconstant.notype.move ,
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
            async loaddata () {
                let counts = 5;

                this.loadobj.isloading = true;

                let list = await moveapi.getaddmovequerylistbyminid( this.minautokey ,
                    counts ,

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
            gotodetaildata ( item ) {

                this.diaObj.isshow = true;

                this.DlgObj.capitalcode = item.capitalcode;
                this.DlgObj.nos = item.nos;
                this.DlgObj.tabindex = 1;
                //this.DlgObj.tempdata = util.GetGuid();
                //dayjs().valueOf() Unix 时间戳 (毫秒)
                //每次给tempdata赋值（唯一）,这样可以激活组件的watch
                this.DlgObj.tempdata = dayjs().valueOf().toString();

                console.log( 'DlgObj' , this.DlgObj )
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
<style scoped
       src="./addmovequery.css">
</style>
