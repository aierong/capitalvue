<!--
作者:chenghao
Date: 2019/9/2
Time: 9:20
功能:
-->

<!-- html代码片段 -->

<!-- 报废单详情 -->
<template>
    <div>
        <div v-if="modeldata!=null">
            <van-divider class="mydivider"
                         content-position="left"
                         dashed> {{ `报废单(${modeldata.nos})详细信息` }}
            </van-divider>
            <van-cell>
                <van-row>
                    <van-col span="24">{{ '资产:' + modeldata.capitalcode +'(' +modeldata.capitalname +')' }}</van-col>
                    <!--                <van-col span="24">{{  '日期:' +  }}</van-col>-->
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>

                    <van-col span="12">{{ '日期:' + modeldata.scrapdate }}</van-col>
                    <van-col span="12">{{ '报废人:' + modeldata.scrapname }}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="12">{{ '报废金额:' + modeldata.scrapmoney }}</van-col>
                    <van-col span="12">{{ '报废原因:' + modeldata.scrapreason }}</van-col>
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

    import * as scrapapi from '@/common/bmobapi/scrap.js'

    export default {
        name : "scrapdetaildata" ,
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
                    scrapapi.GetNosData( this.nos ).then( ( res ) => {
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
<style src="./scrapdetaildata.css"
       scoped>
</style>
