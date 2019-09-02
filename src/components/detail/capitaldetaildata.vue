<!--
作者:chenghao
Date: 2019/9/1
Time: 18:09
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        capitaldetaildata
        capitaldata
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    // api  dl  GetCapitalByCapitalCode
    import * as dlapi from '@/common/bmobapi/dl.js'

    export default {
        name : "capitaldetaildata" ,
        props : {
            capitalcode : String
        } ,
        watch : {
            capitalcode : {
                //监听 资产编号变化，重新生成模型
                handler ( newName , oldName ) {
                    // console.log( 'diaObj.date changed' );

                    this.getcapitalmodel()
                } ,
                immediate : true ,

            }
        } ,
        //数据模型
        data () {
            return {
                capitalmodel : null
            }
        } ,
        //方法
        methods : {
            getcapitalmodel () {
                if ( this.capitalcode ) {
                    dlapi.GetCapitalByCapitalCode( this.capitalcode ).then( ( res ) => {
                        if ( res != null ) {
                            this.capitalmodel = res;
                        }
                        else {
                            this.capitalmodel = null;
                        }
                    } );

                }
                else {
                    this.capitalmodel = null;
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
<style scoped
       src="./capitaldetaildata.css">
</style>
