<!--
作者:chenghao
Date: 2019/9/1
Time: 18:09
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-tabs v-model="tabactive">
            <van-tab title="登记">
                <van-divider content-position="left"
                             dashed>资产详情
                </van-divider>
                <capitaldata :code="capitalcode"></capitaldata>
                <!--                <br>-->
                <van-divider content-position="left"
                             dashed>时光轴(点击可看单据详情)
                </van-divider>
                <nosstep :capitalcode="capitalcode"></nosstep>
            </van-tab>
            <van-tab title="单据信息">

            </van-tab>
        </van-tabs>


    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import capitaldata from '@/components/detail/capitaldata.vue'
    import nosstep from '@/components/detail/nosstep.vue'

    import movedetaildata from '@/components/detail/movedetaildata.vue'
    import saledetaildata from '@/components/detail/saledetaildata.vue'
    import scrapdetaildata from '@/components/detail/scrapdetaildata.vue'

    export default {
        name : "capitaldetaildata" ,
        props : {
            capitalcode : String
        } ,
        //注册组件
        components : {

            capitaldata ,
            nosstep

        } ,
        //数据模型
        data () {
            return {
                tabactive : 0
            }
        } ,
        //方法
        methods : {} ,
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
