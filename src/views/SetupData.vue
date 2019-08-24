<!--
作者:chenghao
Date: 2019/8/24
Time: 14:57
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        SetupData

        <mytabbar></mytabbar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import mytabbar from "@/components/mytabbar.vue";

    export default {
        name : "SetupData" ,
        //注册组件
        components : {

            mytabbar
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
<style src="./SetupData.css"
       scoped>
</style>
