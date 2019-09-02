<!--
作者:chenghao
Date: 2019/9/1
Time: 12:19
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
            <!--            <van-dropdown-item v-model="MyItemVal"-->
            <!--                               :options="optionitemMy"/>-->
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
                    <van-icon @click="itemdelclick(item,_index)"
                              size="20px"
                              name="cross"/>
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

        <van-action-sheet style="height: 78%"
                          v-model="diaObj.isshow"
                          title="资产信息">
            <capitaldetaildata :diaObj="DlgObj"></capitaldetaildata>
        </van-action-sheet>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    //引入 lodash
    import * as _ from "lodash"

    import * as globalconstant from '@/common/constant.js'
    import * as util from '@/common/util/util.js'
    import * as dlapi from '@/common/bmobapi/dl.js'

    import capitaldetaildata from '@/components/detail/capitaldetaildata.vue'

    // 导入
    import { loginuserdatamix } from "@/mixin/loginuserdata.js"

    export default {
        name : "addquery" ,
        //导入混入对象 可以是多个,数组
        mixins : [

            loginuserdatamix ,

        ] ,
        //注册组件
        components : {

            capitaldetaildata ,

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
                // MyItemVal : '' ,
                // optionitemMy : [] ,

                CapitalStatusVal : '正常' ,
                optionitemCapitalStatus : [] ,

                searchval : '' ,

                loadobj : {
                    isover : false ,
                    isshowdivider : false ,
                    isloading : false
                } ,

                DlgObj : {

                    capitalcode : '' ,
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
            gotodetaildata ( item ) {
                // console.log( item )
                // this.$toast.success( "成功" );

                this.DlgObj.capitalcode = item.capitalcode;
                this.diaObj.isshow = true;
            } ,
            createoptionitem () {

                this.optionitemCapitalType = util.GetCapitalTypeList( true );

                // this.optionitemCapitalStatus = util.GetCapitalStatus( true );
                this.optionitemCapitalStatus = [
                    {
                        text : '正常' ,
                        value : '正常'
                    }
                ]

                // this.optionitemMy = [
                //     {
                //         text : '全部' ,
                //         value : ''
                //     } ,
                //     {
                //         text : '我登记的' ,
                //         value : this.loginusermobile
                //     }
                // ]
            } ,
            onSearch () {
                this.initlist();
            } ,
            async loaddata () {
                let counts = 5;

                this.loadobj.isloading = true;

                let list = await dlapi.getaddquerylistbyminid( this.minautokey ,
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
            itemdelclick ( item , _index ) {
                //做一个提示
                let _capitalcode = item.capitalcode;

                this.$dialog.confirm( {
                    message : `确定删除${ _capitalcode }吗?`
                } ).then( () => {
                    // 点击确定按钮
                    //做一个检查

                    ( async () => {
                        let checkresult = await dlapi.DeleteCheck( _capitalcode , this.loginusermobile );

                        if ( checkresult != null && !checkresult.isok ) {
                            this.$toast( checkresult.msg )

                            return;
                        }

                        let result = await dlapi.DeleteCapital( item.objectId );

                        if ( result != null ) {
                            //成功
                            this.$toast.success( "成功" );

                            //把记录删除
                            this.$delete( this.capitallist , _index )
                        }
                        else {
                            //失败
                            this.$toast.fail( "失败" )

                            return;
                        }

                    } )();

                } ).catch( () => {
                    // 点击取消按钮

                } );
            } ,
            async initlist () {
                let initcount = 10;

                let list = await dlapi.getaddquerylistbyminid( 0 ,
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
            this.createoptionitem();

            this.initlist();
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./addquery.css"
       scoped>
</style>
