<!--
作者:chenghao
Date: 2019/8/25
Time: 11:17
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-nav-bar title="添加新资产"
                     left-text="返回"
                     left-arrow
                     @click-left="onClickLeft"/>
        <br>
        <van-cell-group>
            <van-field v-model="capitalmodel.capitalcode"
                       required
                       clearable
                       label="资产代号"
                       placeholder="请输入资产代号"/>
            <van-field v-model="capitalmodel.capitalname"
                       required
                       clearable
                       label="资产名称"
                       placeholder="请输入资产名称"/>
            <van-field v-model="capitalmodel.money"
                       required
                       clearable
                       type="number"
                       label="资产金额"
                       placeholder="请输入资产金额"/>
            <van-field v-model="capitalmodel.money"
                       required
                       label="资产类型">
                <van-dropdown-menu slot="input">

                    <van-dropdown-item v-model="capitalmodel.typename"
                                       :options="menuoptiondata"/>
                </van-dropdown-menu>
            </van-field>
        </van-cell-group>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import * as globalconstant from '@/common/constant.js'

    export default {
        name : "addcapital" ,
        //数据模型
        data () {
            return {
                capitalmodel : {
                    capitalcode : '' ,
                    capitalname : '' ,
                    money : 0 ,
                    //先默认一个
                    typename : globalconstant.CapitalType[ 0 ]
                } ,

                menuoptiondata : [
                    // {
                    //     text : '全部商品' ,
                    //     value : ''
                    // } ,
                    // {
                    //     text : '新款商品' ,
                    //     value : ''
                    // } ,
                    // {
                    //     text : '活动商品' ,
                    //     value : ''
                    // }
                ] ,
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
            console.log( 'addcapital mounted' )
            //menuoptiondata

            //globalconstant.CapitalType
            globalconstant.CapitalType.forEach( ( value , index , array ) => {
                let obj = {
                    text : value ,
                    value : value
                }

                this.menuoptiondata.push( obj );
            } );
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./addcapital.css">
</style>
