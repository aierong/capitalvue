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

        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-dengji"></use>
                </svg>

                <span class="cellspantitleclass">资产登记</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-zhuanyi1"></use>
                </svg>

                <span class="cellspantitleclass">资产转移</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-chushou"></use>
                </svg>

                <span class="cellspantitleclass">资产出售</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-yaopinbaofei"></use>
                </svg>

                <span class="cellspantitleclass">资产报废</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:20px;">
                    <use xlink:href="#icon-chaxun-current"></use>
                </svg>

                <span class="cellspantitleclass">资产查询</span>
            </template>
        </van-cell>
        <br>
        <br>
        <div class="titleclass">我的资产数据</div>
        <div>

            <ve-bar :data="chartData"
                    :data-empty="chartEmptyData"></ve-bar>
        </div>
        <mytabbar></mytabbar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    // import mytabbar from "@/components/mytabbar.vue";

    // 引入阿里图标js
    import "@/assets/ali/iconfont/iconfont.js"

    import * as dlapi from '@/common/bmobapi/dl.js'

    import * as globalconstant from '@/common/constant.js'

    import { loginuserdatamix } from '@/mixin/loginuserdata.js'

    export default {
        name : "CZ" ,
        //导入混入对象 可以是多个,数组
        mixins : [ loginuserdatamix ] ,
        //注册组件
        // components : {
        //
        //     mytabbar
        // } ,
        //数据模型
        data () {
            return {
                chartData : {
                    columns : [ '数量' , '资产' , '正常' , '出售' , '报废' ] ,
                    rows : [
                        // {
                        //     '数量' : '' ,
                        //     '资产' : 1093 ,
                        //     '正常' : 1000 ,
                        //     '出售' : 90 ,
                        //     '报废' : 3
                        // } ,

                    ]
                } ,
                chartEmptyData : false

            }
        } ,
        //方法
        methods : {
            async getcapitalcounts () {
                let _mobile = this.loginusermobile;

                var result = await Promise.all( [
                    dlapi.GetCapitalCounts( _mobile , globalconstant.normal ) ,
                    dlapi.GetCapitalCounts( _mobile , globalconstant.sale ) ,
                    dlapi.GetCapitalCounts( _mobile , globalconstant.scrap ) ,
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
