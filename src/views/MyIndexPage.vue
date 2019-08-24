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

            <van-grid-item text="退出">
                <svg slot="icon"
                     class="icon myicon"
                     aria-hidden="true">
                    <use xlink:href="#icon-tuichu"></use>
                </svg>
            </van-grid-item>
        </van-grid>

        <mytabbar></mytabbar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    // 引入阿里图标js
    import "@/assets/ali/iconfont/iconfont.js"

    import { mapState } from 'vuex'

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
                msg : '' ,
                swipeimagelist : [
                    require( `@/assets/capitalswipeimage/ji1.jpg` ) ,
                    require( `@/assets/capitalswipeimage/ji2.jpeg` ) ,

                    require( `@/assets/capitalswipeimage/car1.jpeg` ) ,
                    require( `@/assets/capitalswipeimage/car2.jpg` ) ,

                    require( `@/assets/capitalswipeimage/house1.jpg` ) ,
                ]
            }
        } ,
        //方法
        methods : {
            queryclick () {
                // 页面跳转
                this.$router.push( "/querydata" )
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
