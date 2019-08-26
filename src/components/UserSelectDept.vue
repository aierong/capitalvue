<!--
作者:chenghao
Date: 2019/8/25
Time: 17:55
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        UserSelectDept
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import {
        mapState ,
        mapMutations
    } from 'vuex'

    export default {
        name : "UserSelectDept" ,
        //数据模型
        data () {
            return {
                msg : ''
            }
        } ,
        //方法
        methods : {
            ...mapMutations( [

                'SetDeptData'

            ] ) ,

        } ,
        //计算属性
        computed : {
            ...mapState( {

                deptdata : 'deptdata' ,

            } ) ,
        } ,
        //生命周期(mounted)
        mounted () {
            console.log( 'UserSelectDept mounted' )
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./UserSelectDept.css"
       scoped>
</style>
