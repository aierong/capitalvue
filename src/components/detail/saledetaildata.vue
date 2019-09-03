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
                         dashed> {{ `出售单(${modeldata.nos})详细信息` }}
            </van-divider>
            <van-cell>
                <van-row>
                    <van-col span="24">{{ '资产:' + modeldata.capitalcode +'(' +modeldata.capitalname +')' }}</van-col>
                    <!--                <van-col span="24">{{  '日期:' +  }}</van-col>-->
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>

                    <van-col span="12">{{ '日期:' + modeldata.saledate }}</van-col>
                    <van-col span="12">{{ '出售人:' + modeldata.salename }}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="12">{{ '出售金额:' + modeldata.salemoney }}</van-col>
                    <van-col span="12">{{ '销售对象:' + modeldata.saleto }}</van-col>
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

    import * as saleapi from '@/common/bmobapi/sale.js'

    export default {
        name : "saledetaildata" ,
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
                    saleapi.GetNosData( this.nos ).then( ( res ) => {
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
<style scoped
       src="./saledetaildata.css">
</style>
