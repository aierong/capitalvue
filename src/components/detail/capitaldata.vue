<!--
作者:chenghao
Date: 2019/9/2
Time: 16:15
功能:
-->

<!-- html代码片段 -->
<template>
    <div>
        <div v-if="modeldata!=null">
            <van-cell>
                <van-row>
                    <van-col span="12">{{ '资产:' + modeldata.capitalname  }}</van-col>
                    <van-col span="12">{{ '保管人:' + modeldata.saveman  }}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>

                    <van-col span="12">{{ '资产类型:' + modeldata.typename }}</van-col>
                    <van-col span="12">{{ '金额:' + modeldata.money }}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>

                    <van-col span="12">{{ '单位:' + modeldata.unit }}</van-col>
                    <van-col span="12">{{ '保管部门:' + modeldata.deptname }}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>

                    <van-col span="24">{{ '保管位置:' + modeldata.savesite }}</van-col>

                </van-row>
            </van-cell>
            <van-cell>
                <van-row>

                    <van-col span="24">{{ `备注:${modeldata.comment}` }}</van-col>

                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="24">{{ `录入:${modeldata.username}(${modeldata.inputdate})` }}</van-col>

                </van-row>
            </van-cell>
        </div>
    </div>
</template>

<!-- js脚本代码片段 -->
<script>

    import * as dlapi from '@/common/bmobapi/dl.js'

    export default {
        name : "capitaldata" ,
        props : {
            code : String
        } ,
        watch : {
            capitalcode : {
                //监听 资产编号变化，重新生成模型
                handler ( newName , oldName ) {
                    // console.log( 'capitaldata changed' , newName );

                    this.getcapitalmodel()
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
            getcapitalmodel () {

                if ( this.code ) {
                    dlapi.GetCapitalByCapitalCode( this.code ).then( ( res ) => {
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
<style src="./capitaldata.css"
       scoped>
</style>
