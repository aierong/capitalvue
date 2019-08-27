<!--
作者:chenghao
Date: 2019/8/27
Time: 14:53
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-action-sheet v-model="diaObj.isshow"
                          title="选择正常状态资产">
            <!--            show-action-->
            <van-search placeholder="请输入搜索关键词"
                        v-model="searchval">
                <!--                <div slot="action">搜索1</div>-->
                <div slot="label">
                    <van-dropdown-menu>
                        <!--            value	当前选中项对应的 value -->
                        <!--            options	选项数组	Array	 -->
                        <van-dropdown-item v-model="itemval"
                                           :options="optionitem"/>

                    </van-dropdown-menu>
                </div>
            </van-search>
            <!--            <van-cell-group>-->
            <van-list :finished="downrefresh.finished"
                      :offset="10"
                      @load="onDownRefreshLoad"
                      finished-text="我是有底线的"
                      loading-text="客官莫急,正搞数据中..."
                      v-model="downrefresh.loading">
                <van-cell :key="_index"
                          v-for="(item,_index) in capitallist"
                          :title="`(${ item.capitalcode })${ item.capitalname }`">
                    <template slot="right-icon">
                        <van-icon @click="itemclick(item.capitalcode,item.capitalname)"
                                  color="red"
                                  size="20px"
                                  name="certificate"/>
                    </template>
                </van-cell>
            </van-list>
            <!--            </van-cell-group>-->
            <!--            <p>内容</p>-->
            <!--            <p>内容</p>-->
            <!--            <p>内容</p>-->
            <!--            <p>内容</p>-->
            <!--            <p>内容</p>-->
            <!--            <p>内容</p>-->
            <!--            <p>内容</p>-->
            <!--            <p>内容</p>-->
            <!--            <p>内容</p>-->
        </van-action-sheet>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    //引入 lodash
    import * as _ from "lodash"

    import * as globalconstant from '@/common/constant.js'
    import * as  dlapi from '@/common/bmobapi/dl.js'

    export default {
        name : "selectcapital" ,
        props : {
            diaObj : Object
        } ,
        //数据模型
        data () {
            return {
                capitallist : [] ,
                searchval : '' ,

                itemval : '' ,
                optionitem : [
                    // {
                    //     text : '全部商品' ,
                    //     value : 0
                    // } ,
                    // {
                    //     text : '新款商品' ,
                    //     value : 1
                    // } ,
                    // {
                    //     text : '活动商品' ,
                    //     value : 2
                    // }
                ] ,
                //下拉刷新使用的参数
                downrefresh : {
                    loading : false ,
                    finished : false
                } ,
            }
        } ,
        //方法
        methods : {
            createoptionitem () {
                //let list = globalconstant.CapitalType;

                this.optionitem.push( {
                    text : '全部' ,
                    value : ''
                } )

                globalconstant.CapitalType.forEach( ( val , index , array ) => {
                    this.optionitem.push( {
                        text : val ,
                        value : val
                    } )
                } )
            } ,
            itemclick ( capitalcode , capitalname ) {
                // 选择确定事件 ,把选择好的头像传递回去
                this.$emit( "selectcapital" , capitalcode , capitalname );

                return;
            } ,
            async initlist () {
                let initcount = 5;

                let list = await dlapi.getnormalcapitallistidbyminid( 0 , initcount , '' );

                // console.log( list );

                if ( list != null && list.length > 0 ) {
                    this.capitallist = list;
                }
                else {
                    this.capitallist = [];
                }
            } ,

            //下拉刷新
            onDownRefreshLoad () {
                let counts = 2;

                dlapi.getnormalcapitallistidbyminid( this.minautokey , counts , '' ).then( ( res ) => {
                    console.log( 'onPullRefreshRefresh' , res )
                } );
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
