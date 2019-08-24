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
                <img :src="it"
                     alt/>
            </van-swipe-item>

            <!--            <van-swipe-item>4</van-swipe-item>-->
        </van-swipe>
        <van-grid :column-num="3">
            <van-grid-item icon="coupon-o"
                           text="登记"/>
            <van-grid-item icon="photo-o"
                           text="转移"/>

            <van-grid-item icon="photo-o"
                           text="出售"/>

            <van-grid-item icon="photo-o"
                           text="报废"/>

            <van-grid-item icon="photo-o"
                           text="查询"/>

            <van-grid-item icon="photo-o"
                           text="退出"/>

        </van-grid>

        <mytabbar></mytabbar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
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
            //methodsname() {
            //代码搞这里
            //},

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
