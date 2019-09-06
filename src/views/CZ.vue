<!--
作者:chenghao
Date: 2019/8/25
Time: 0:23
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <div class="titleclass">资产操作</div>

        <br>

        <van-cell @click="onAddClick">
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-dengji"></use>
                </svg>

                <span class="cellspantitleclass">资产登记</span>
            </template>
        </van-cell>
        <van-cell @click="onMoveClick">
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-zhuanyi1"></use>
                </svg>

                <span class="cellspantitleclass">资产转移</span>
            </template>
        </van-cell>
        <van-cell @click="onSaleClick">
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-chushou"></use>
                </svg>

                <span class="cellspantitleclass">资产出售</span>
            </template>
        </van-cell>
        <van-cell @click="onScrapClick">
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-yaopinbaofei"></use>
                </svg>

                <span class="cellspantitleclass">资产报废</span>
            </template>
        </van-cell>
        <van-cell @click="onQueryClick">
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-chaxun-current"></use>
                </svg>

                <span class="cellspantitleclass">资产查询</span>
            </template>
        </van-cell>

        <van-divider class="mydivider"
                     dashed>
            我的资产数据
        </van-divider>
        <div>
            <ve-bar :data="chartData"
                    :data-empty="chartEmptyData"></ve-bar>
        </div>
        <mytabbar></mytabbar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>

    import Vue from 'vue';

    import VCharts from 'v-charts'

    Vue.use( VCharts )

    // 引入阿里图标js
    import "@/assets/ali/iconfont/iconfont.js"

    import * as dlapi from '@/common/bmobapi/dl.js'

    import * as globalconstant from '@/common/constant.js'

    import { loginuserdatamix } from '@/mixin/loginuserdata.js'

    export default {
        name : "CZ" ,
        //导入混入对象 可以是多个,数组
        mixins : [ loginuserdatamix ] ,

        //数据模型
        data () {
            return {
                chartData : {
                    columns : [
                        '数量' , '资产' , '正常' , '出售' , '报废'
                    ] ,
                    rows : []
                } ,
                chartEmptyData : false

            }
        } ,
        //方法
        methods : {
            onQueryClick () {
                // 页面跳转
                this.$router.push( "/querydata" )

                return;
            } ,
            onAddClick () {
                // 页面跳转
                this.$router.push( "/addcapital" )

                return;
            } ,
            onMoveClick () {
                // 页面跳转
                this.$router.push( "/movecapital" )

                return;
            } ,
            onSaleClick () {
                // 页面跳转
                this.$router.push( "/salecapital" )

                return;
            } ,
            onScrapClick () {
                // 页面跳转
                this.$router.push( "/scrapcapital" )

                return;
            } ,
            async getcapitalcounts () {
                let _mobile = this.loginusermobile;
                // console.log(_mobile)
                var result = await Promise.all( [
                    dlapi.GetCapitalCounts( _mobile , globalconstant.CapitalStatus.normal ) ,
                    dlapi.GetCapitalCounts( _mobile , globalconstant.CapitalStatus.sale ) ,
                    dlapi.GetCapitalCounts( _mobile , globalconstant.CapitalStatus.scrap ) ,
                ] )

                if ( result != null && result.length >= 3 ) {
                    // console.log( result )

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
            } ,

        } ,
        //计算属性
        computed : {
            //name() {
            //代码搞这里
            //return this.data;
            //}
        } ,
        //生命周期(mounted)
        mounted () {
            // console.log( 'CZ mounted' )

            this.getcapitalcounts();
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./CZ.css"
       scoped>
</style>
