<!--
作者:chenghao
Date: 2019/9/2
Time: 16:38
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        {{ capitalcode }}
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    export default {
        name : "t1" ,

        props : {
            capitalcode : String
        } ,
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
<style>

</style>
