<!--
作者:chenghao
Date: 2019/8/26
Time: 22:00
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-nav-bar title="登记出售资产"
                     left-text="返回"
                     left-arrow
                     @click-left="onClickLeft"/>
        <br>

        <van-cell-group>
            <van-field v-model="scrapmodel.nos"
                       required
                       readonly
                       label="出售单号"/>
            <van-field v-model="capitalallname"
                       required
                       readonly
                       label="资产"
                       placeholder="请选择资产">
                <van-button slot="button"
                            @click="opencapitaldlg"
                            size="small"
                            type="primary">选择
                </van-button>
            </van-field>
        </van-cell-group>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import dayjs from 'dayjs'

    // 导入
    import { loginuserdatamix } from "@/mixin/loginuserdata.js"
    import * as RandomUtil from '@/common/util/RandomUtil.js'

    import selectcapital from '@/components/selectcapital.vue'
    import selectdate from '@/components/selectdate.vue'

    import * as util from '@/common/util/util.js'

    import * as  dlapi from '@/common/bmobapi/dl.js'
    import * as sale from '@/common/bmobapi/sale.js'

    export default {
        name : "salecapital" ,
        //数据模型
        data () {
            return {
                msg : ''
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

        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./salecapital.css">
</style>
