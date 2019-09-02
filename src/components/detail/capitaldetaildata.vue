<!--
作者:chenghao
Date: 2019/9/1
Time: 18:09
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <capitaldata @capitalcode="capitalcode"></capitaldata>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import capitaldata from '@/components/detail/capitaldata.vue'

    export default {
        name : "capitaldetaildata" ,
        props : {
            capitalcode : String
        } ,
        //注册组件
        components : {

            capitaldata ,

        } ,
        //数据模型
        data () {
            return {
                msg : ''
            }
        } ,
        //方法
        methods : {} ,
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
       src="./capitaldetaildata.css">
</style>
