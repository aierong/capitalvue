<!--
作者:chenghao
Date: 2019/8/27
Time: 8:12
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-nav-bar title="登记报废资产"
                     left-text="返回"
                     left-arrow
                     @click-left="onClickLeft"/>
        <br>
        <van-cell-group>
            <van-field v-model="scrapmodel.nos"
                       required
                       readonly
                       label="报废单"/>
            <van-field v-model="scrapmodel.capitalcode"
                       required
                       readonly
                       label="资产代号"
                       placeholder="请选择资产代号"/>
        </van-cell-group>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    export default {
        name : "scrapcapital" ,
        //数据模型
        data () {
            return {
                scrapmodel : {
                    nos : '' ,
                    capitalcode : '' ,
                    capitalname : '' ,

                    scrapmoney : 0 ,
                    scrapname : '' ,
                    scrapdate : '' ,
                    scrapreason : '' ,

                    comment : '' ,

                    userid : '' ,
                    username : '' ,
                    inputdate : '' ,

                } ,
            }
        } ,
        //方法
        methods : {
            onClickLeft () {
                // 页面跳转
                this.$router.push( "/cz" )

                return;
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
<style scoped
       src="./scrapcapital.css">
</style>
