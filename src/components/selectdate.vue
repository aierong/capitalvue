<!--
作者:chenghao
Date: 2019/8/27
Time: 16:35
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-popup position="bottom"
                   v-model="diaObj.isshow">内容
        </van-popup>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    export default {
        name : "selectdate" ,
        props : {
            diaObj : Object
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
<style scoped
       src="./selectdate.css">
</style>
