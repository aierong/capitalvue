<!--
作者:chenghao
Date: 2019/9/2
Time: 9:18
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        转移单

    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    //api move GetNosData
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

                    this.getmodel()
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
            getmodel () {
                if ( this.nos ) {
                    moveapi.GetNosData( this.nos ).then( ( res ) => {
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
