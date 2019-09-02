<!--
作者:chenghao
Date: 2019/9/2
Time: 9:18
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-row>
            <van-col span="12">{{ '单号:' + modeldata.nos }}</van-col>
            <van-col span="12">{{ '录入:' + modeldata.inputdate + modeldata.username }}</van-col>
            <!--            <van-col span="8">span: 8</van-col>-->
        </van-row>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>

    import * as moveapi from '@/common/bmobapi/move.js'

    export default {
        name : "movedetaildata" ,
        props : {
            nos : String
        } ,
        watch : {
            nos : {
                //监听 资产编号变化，重新生成模型
                handler ( newName , oldName ) {
                    // console.log( 'capitaldata changed' , newName );

                    this.getmodel( newName )
                } ,
                immediate : true ,

            } ,
        } ,
        //数据模型
        data () {
            return {
                modeldata : null
            }
        } ,
        //方法
        methods : {
            getmodel ( _nos ) {
                if ( _nos ) {
                    moveapi.GetNosData( _nos ).then( ( res ) => {
                        if ( res != null ) {
                            this.modeldata = res;
                        }
                        else {
                            this.modeldata = null;
                        }
                    } );

                }
                else {
                    this.modeldata = null;
                }
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
<style src="./movedetaildata.css"
       scoped>
</style>
