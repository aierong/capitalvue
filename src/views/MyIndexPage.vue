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
            <van-grid-item text="登记">
                <svg slot="icon"
                     class="icon myicon"
                     aria-hidden="true">
                    <use xlink:href="#icon-dengji"></use>
                </svg>
            </van-grid-item>

            <van-grid-item text="转移">
                <svg slot="icon"
                     class="icon myicon"
                     aria-hidden="true">
                    <use xlink:href="#icon-zhuanyi1"></use>
                </svg>
            </van-grid-item>

            <van-grid-item text="出售">
                <svg slot="icon"
                     class="icon myicon"
                     aria-hidden="true">
                    <use xlink:href="#icon-chushou"></use>
                </svg>
            </van-grid-item>

            <van-grid-item text="报废">
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
            <!--            <ve-line :data="chartData"></ve-line>-->
            <ve-bar :data="chartData"></ve-bar>
        </div>
        <mytabbar></mytabbar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    // 引入阿里图标js
    import "@/assets/ali/iconfont/iconfont.js"

    import {
        mapState ,
        mapMutations
    } from 'vuex'

    import mytabbar from "@/components/mytabbar.vue";

    export default {
        name : "MyIndexPage" ,
        //注册组件
        components : {

            mytabbar
        } ,
        //数据模型
        data () {
            return {
                /**
                 * 轮播图的图片列表
                 */
                swipeimagelist : [
                    require( `@/assets/capitalswipeimage/ji1.jpg` ) ,
                    require( `@/assets/capitalswipeimage/ji2.jpeg` ) ,

                    require( `@/assets/capitalswipeimage/car1.jpeg` ) ,
                    require( `@/assets/capitalswipeimage/car2.jpg` ) ,

                    require( `@/assets/capitalswipeimage/house1.jpg` ) ,
                ] ,
                chartData : {
                    columns : [ '数量' , '资产' , '出售' , '报废' ] ,
                    rows : [
                        {
                            '数量' : '' ,
                            '资产' : 1093 ,
                            '出售' : 639 ,
                            '报废' : 200
                        } ,

                    ]
                } ,

            }
        } ,
        //方法
        methods : {
            ...mapMutations( [

                'clearloginuser'

            ] ) ,
            //查询跳转
            queryclick () {
                // 页面跳转
                this.$router.push( "/querydata" )
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
            exitsystem () {

                //  清除一下
                this.clearloginuser();

                //页面转向 登录
                this.$router.push( '/login' )

                return;
            } ,
        } ,
        //计算属性
        computed : {
            ...mapState( {

                useraddress : 'address' ,

            } ) ,
        } ,
        //生命周期(mounted)
        mounted () {

        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./MyIndexPage.css">
</style>
