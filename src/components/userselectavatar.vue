<!--
作者:chenghao
功能:vue页
-->

<!--
 头像选择组件
 -->
<template>

    <div>
        <van-dialog :before-close="beforeClose"
                    show-cancel-button
                    v-model="diaObj.showdialog">

            <van-cell title="请选择头像">
            </van-cell>
            <van-radio-group v-model="diaObj.avatar">
                <van-cell-group>
                    <van-cell v-for="(item,index) in touxianglist"
                              :key="index">
                        <template slot="title">
                            <svg class="icon"
                                 aria-hidden="true"
                                 style="font-size:30px;">
                                <use v-bind:xlink:href="item  | iconallname"></use>
                            </svg>
                        </template>
                        <van-radio :name="item"/>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-dialog>
    </div>

</template>


<!-- js脚本代码片段 -->
<script>
    // 引入阿里图标js
    import "@/assets/ali/iconfont/iconfont.js"

    import * as globalconstant from '@/common/constant.js'

    //导入
    import { mix } from "@/mixin/index.js"

    export default {
        name : "userselectavatar" ,
        props : {
            diaObj : Object
        } ,
        //导入混入对象 可以是多个,数组
        mixins : [ mix ] ,
        //数据模型
        data () {
            return {
                //头像列表
                touxianglist : globalconstant.avatariconlist
            }
        } ,
        //方法
        methods : {
            beforeClose ( action , done ) {
                if ( action === "confirm" ) {

                    // 选择确定事件 ,把选择好的头像传递回去
                    this.$emit( "selectavatar" , this.diaObj.avatar );

                    done()
                }
                else {
                    //关闭窗体事件
                    this.$emit( "closewin" );

                    done()
                }
            }

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
<style src="./userselectavatar.css"
       scoped>
</style>
