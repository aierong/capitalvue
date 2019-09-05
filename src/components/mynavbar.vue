<!--
作者:chenghao
Date: 2019/9/5
Time: 22:10
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <!--        :right-text="righttext"-->
        <van-nav-bar :title="title"
                     :left-text="lefttext"

                     :left-arrow="isdisplayleftarrow"
                     @click-left="onClickLeft"
                     @click-right="onClickRight">
            <template slot="right"
                      v-if="righttext || righticon">
                <van-icon v-if="righticon"
                          size="18px"
                          :name="righticon"/>
                <span v-if="righttext">{{ righttext }}</span>
            </template>
        </van-nav-bar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    export default {
        name : "mynavbar" ,
        props : {
            title : {
                type : String ,
                default : ''
            } ,
            lefttext : {
                type : String ,
                default : ''
            } ,
            righttext : {
                type : String ,
                default : ''
            } ,
            righticon : {
                type : String ,
                default : ''
            } ,
            isdisplayleftarrow : {
                type : Boolean ,
                default : true

            }
        } ,
        //数据模型
        data () {
            return {
                msg : ''
            }
        } ,
        //方法
        methods : {
            onClickLeft () {
                this.$emit( "ClickLeft" );
            } ,
            onClickRight () {
                this.$emit( "ClickRight" );
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

        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./mynavbar.css"
       scoped>
</style>
