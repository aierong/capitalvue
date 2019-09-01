<!--
作者:chenghao
Date: 2019/9/1
Time: 12:19
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-dropdown-menu>
            <!--            value	当前选中项对应的 value -->
            <!--            options	选项数组	Array	 -->
            <van-dropdown-item v-model="CapitalTypeItemVal"
                               :options="optionitemCapitalType"/>
            <van-dropdown-item v-model="MyItemVal"
                               :options="optionitemMy"/>
            <van-dropdown-item v-model="CapitalStatusVal"
                               :options="optionitemCapitalStatus"/>
        </van-dropdown-menu>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import * as util from '@/common/util/util.js'

    export default {
        name : "addquery" ,
        //数据模型
        data () {
            return {
                CapitalTypeItemVal : '' ,
                //资产类型
                optionitemCapitalType : [] ,
                MyItemVal : '' ,
                //全部和我的
                optionitemMy : [] ,

                CapitalStatusVal : '' ,
                optionitemCapitalStatus : [] ,
            }
        } ,
        //方法
        methods : {
            createoptionitem () {

                this.optionitemCapitalType = util.GetCapitalTypeList( true );

                this.optionitemCapitalStatus = util.GetCapitalStatus( true );

                this.optionitemMy = [
                    {
                        text : '全部' ,
                        value : ''
                    } ,
                    {
                        text : '我登记的' ,
                        value : this.loginusermobile
                    }
                ]
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
            this.createoptionitem();
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./addquery.css"
       scoped>
</style>
