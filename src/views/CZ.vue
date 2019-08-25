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
        <mytabbar></mytabbar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    // import mytabbar from "@/components/mytabbar.vue";

    // 引入阿里图标js
    import "@/assets/ali/iconfont/iconfont.js"

    export default {
        name : "CZ" ,
        //注册组件
        // components : {
        //
        //     mytabbar
        // } ,
        //数据模型
        data () {
            return {
                msg : ''
            }
        } ,
        //方法
        methods : {
            //methodsname() {
            //代码搞这里
            //},

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

        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./CZ.css"
       scoped>
</style>
