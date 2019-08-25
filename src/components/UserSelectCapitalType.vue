<!--
作者:chenghao
Date: 2019/8/25
Time: 12:27
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-dialog :before-close="beforeClose"
                    show-cancel-button
                    v-model="diaObj.isshowdialog">
            <van-radio-group v-model="diaObj.typename">
                <van-cell-group>
                    <van-cell :key="_index"
                              v-for="(item,_index) in typelist"
                              :title="item">
                        <van-radio slot="right-icon"
                                   :name="item"/>
                    </van-cell>

                </van-cell-group>
            </van-radio-group>
        </van-dialog>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import * as globalconstant from '@/common/constant.js'

    export default {
        name : "UserSelectCapitalType" ,
        props : {
            diaObj : Object
        } ,
        //数据模型
        data () {
            return {
                typelist : globalconstant.CapitalType
            }
        } ,
        //方法
        methods : {
            beforeClose ( action , done ) {
                if ( action === "confirm" ) {

                    // 选择确定事件 ,把选择好的类型传递回去
                    this.$emit( "selectresult" , true , this.diaObj.typename );

                    // done()
                }
                else {
                    //关闭窗体事件

                    //没有选择就是关闭
                    this.$emit( "selectresult" , false , '' );

                    // done()
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
<style src="./UserSelectCapitalType.css"
       scoped>
</style>
