<!--
作者:chenghao
Date: 2019/8/24
Time: 14:42
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-cell :title="useraddress"
                  icon="location-o"/>

        <!--        <br>-->
        <van-swipe :autoplay="3000">

            <van-swipe-item class="swipepic"
                            :key="index"
                            v-for="(it, index) in swipeimagelist">
                <!--                :src="it"-->
                <!--配合 Lazyload 组件实现图片懒加载-->
                <img v-lazy="it"
                     alt/>
            </van-swipe-item>

        </van-swipe>
        <van-grid :column-num="3">
            <van-grid-item @click="addcapital"
                           text="登记">
                <svg slot="icon"
                     class="icon myicon"
                     aria-hidden="true">
                    <use xlink:href="#icon-dengji"></use>
                </svg>
            </van-grid-item>

            <van-grid-item @click="movecapital"
                           text="转移">
                <svg slot="icon"
                     class="icon myicon"
                     aria-hidden="true">
                    <use xlink:href="#icon-zhuanyi1"></use>
                </svg>
            </van-grid-item>

            <van-grid-item @click="salecapital"
                           text="出售">
                <svg slot="icon"
                     class="icon myicon"
                     aria-hidden="true">
                    <use xlink:href="#icon-chushou"></use>
                </svg>
            </van-grid-item>

            <van-grid-item @click="scrapcapital"
                           text="报废">
                <svg slot="icon"
                     class="icon myicon"
                     aria-hidden="true">
                    <use xlink:href="#icon-yaopinbaofei"></use>
                </svg>
            </van-grid-item>

            <van-grid-item text="查询"
                           @click="queryclick">
                <svg slot="icon"
                     class="icon myicon"
                     aria-hidden="true">
                    <use xlink:href="#icon-chaxun-current"></use>
                </svg>
            </van-grid-item>

            <van-grid-item text="退出"
                           @click="exitclick">
                <svg slot="icon"
                     class="icon myicon"
                     aria-hidden="true">
                    <use xlink:href="#icon-tuichu"></use>
                </svg>
            </van-grid-item>
        </van-grid>
        <br>
        <div>

            <ve-bar :data="chartData"
                    :data-empty="chartEmptyData"></ve-bar>
        </div>
        <mytabbar></mytabbar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    //懒加载需要单独引入
    import Vue from 'vue';
    import { Lazyload } from "vant";

    Vue.use( Lazyload );

    import VCharts from 'v-charts'

    Vue.use( VCharts )

    // 引入阿里图标js
    import "@/assets/ali/iconfont/iconfont.js"

    import * as dlapi from '@/common/bmobapi/dl.js'

    import * as globalconstant from '@/common/constant.js'

    // 导入
    import { loginuserdatamix } from "@/mixin/loginuserdata.js"

    import {
        mapState
    } from 'vuex'

    export default {
        name : "MyIndexPage" ,
        //导入混入对象 可以是多个,数组
        mixins : [

            loginuserdatamix ,

        ] ,
        //数据模型
        data () {
            return {
                /**
                 * 轮播图的图片列表
                 */
                swipeimagelist : [
                    require( `@/assets/capitalswipeimage/ji1.jpg` ) ,

                    require( `@/assets/capitalswipeimage/car4.jpg` ) ,
                    require( `@/assets/capitalswipeimage/car6.jpg` ) ,

                    require( `@/assets/capitalswipeimage/dianzi.jpg` ) ,

                    require( `@/assets/capitalswipeimage/fangwu1.jpg` ) ,

                    require( `@/assets/capitalswipeimage/chart.jpg` ) ,
                    require( `@/assets/capitalswipeimage/capital.jpg` ) ,
                ] ,
                chartData : {
                    columns : [ '数量' , '资产' , '正常' , '出售' , '报废' ] ,
                    rows : []
                } ,
                chartEmptyData : false

            }
        } ,
        //方法
        methods : {
            addcapital () {
                // 页面跳转
                this.$router.push( "/addcapital" )

                return;
            } ,
            movecapital () {
                // 页面跳转
                this.$router.push( "/movecapital" )

                return;
            } ,
            salecapital () {
                // 页面跳转
                this.$router.push( "/salecapital" )

                return;
            } ,
            scrapcapital () {
                // 页面跳转
                this.$router.push( "/scrapcapital" )

                return;
            } ,
            //查询跳转
            queryclick () {
                // 页面跳转
                this.$router.push( "/querydata" )

                return;
            } ,
            //退出
            exitclick () {
                this.$dialog.confirm( {
                    message : '确定退出吗?'
                } ).then( () => {
                    // 点击确定按钮

                    this.exitsystem();

                } ).catch( () => {
                    // 点击取消按钮

                } );
            } ,

            async getcapitalcounts () {

                var result = await Promise.all( [
                    dlapi.GetCapitalCounts( '' , globalconstant.CapitalStatus.normal ) ,
                    dlapi.GetCapitalCounts( '' , globalconstant.CapitalStatus.sale ) ,
                    dlapi.GetCapitalCounts( '' , globalconstant.CapitalStatus.scrap ) ,
                ] )

                if ( result != null && result.length >= 3 ) {
                    // console.log( 'getcapitalcounts' , result )

                    if ( result[ 0 ] <= 0 && result[ 1 ] <= 0 && result[ 2 ] <= 0 ) {
                        this.chartEmptyData = true;
                    }
                    else {
                        let obj = {
                            '数量' : '' ,
                            '资产' : result[ 0 ] + result[ 1 ] + result[ 2 ] ,
                            '正常' : result[ 0 ] ,
                            '出售' : result[ 1 ] ,
                            '报废' : result[ 2 ]
                        };

                        this.chartData.rows.push( obj );

                        this.chartEmptyData = false;
                    }
                }
            }
        } ,
        //计算属性
        computed : {
            ...mapState( {

                useraddress : 'address' ,

            } ) ,
        } ,
        //生命周期(mounted)
        mounted () {
            // console.log( 'MyIndexPage mounted' )

            this.getcapitalcounts();
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./MyIndexPage.css">
</style>
