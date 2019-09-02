<!--
作者:chenghao
Date: 2019/9/2
Time: 9:18
功能:
-->

<!-- html代码片段 -->
<template>
    <div>
        <div v-if="modeldata!=null">
            <van-divider class="mydivider"
                         content-position="left"
                         dashed> {{ `转移单(${modeldata.nos})详细信息` }}
            </van-divider>

            <van-cell>
                <van-row>
                    <van-col span="24">{{ '资产:' + modeldata.capitalcode +'(' +modeldata.capitalname +')' }}</van-col>
                    <!--                <van-col span="24">{{  '日期:' +  }}</van-col>-->
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>

                    <van-col span="12">{{ '日期:' + modeldata.movedate }}</van-col>
                    <van-col span="12">{{ '转移人:' + modeldata.movename }}</van-col>
                </van-row>
            </van-cell>

            <van-cell>
                <van-row>
                    <van-col span="12">{{ '原部门:' + modeldata.olddeptname }}</van-col>
                    <van-col span="12">{{ '现部门:' + modeldata.newdeptname }}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="12">{{ '原位置:' + modeldata.oldsavesite }}</van-col>
                    <van-col span="12">{{ '现位置:' + modeldata.newsavesite }}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="12">{{ '原保管人:' + modeldata.oldsaveman }}</van-col>
                    <van-col span="12">{{ '现保管人:' + modeldata.newsaveman }}</van-col>
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
