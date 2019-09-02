<!--
作者:chenghao
Date: 2019/9/1
Time: 18:09
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <!--        type="card"-->
        <van-tabs v-model="tabactive">
            <van-tab title="资产信息">
                <van-divider class="mydivider"
                             content-position="left"
                             dashed>资产详情
                </van-divider>
                <capitaldata :code="diaObj.capitalcode"></capitaldata>
                <!--                <br>-->
                <van-divider class="mydivider"
                             content-position="left"
                             dashed>时光轴(点击可看单据详情)
                </van-divider>
                <nosstep @userselectnos="userselectnos"
                         :capitalcode="diaObj.capitalcode"></nosstep>
            </van-tab>
            <van-tab title="单据信息">
                <!--                做一个判断，显示谁-->
                <movedetaildata v-if="ismove"
                                :nos="selectnos"></movedetaildata>
                <saledetaildata v-if="issale"
                                :nos="selectnos"></saledetaildata>
                <scrapdetaildata v-if="isscrap"
                                 :nos="selectnos"></scrapdetaildata>
            </van-tab>
        </van-tabs>


    </div>

</template>

<!-- js脚本代码片段  capitaldetaildata -->
<script>
    import capitaldata from '@/components/detail/capitaldata.vue'
    import nosstep from '@/components/detail/nosstep.vue'

    import movedetaildata from '@/components/detail/movedetaildata.vue'
    import saledetaildata from '@/components/detail/saledetaildata.vue'
    import scrapdetaildata from '@/components/detail/scrapdetaildata.vue'

    import * as globalconstant from '@/common/constant.js'

    export default {
        name : "capitaldetaildata" ,
        props : {

            diaObj : Object ,

        } ,
        //注册组件
        components : {

            capitaldata ,
            nosstep ,
            movedetaildata ,
            saledetaildata ,
            scrapdetaildata

        } ,
        //数据模型
        data () {
            return {
                tabactive : 0 ,

                selectnos : '' ,

                notype : ''
            }
        } ,
        //方法
        methods : {
            userselectnos ( nos , _type ) {
                //切换tab
                this.tabactive = 1;
                this.selectnos = nos;

                this.notype = _type;
            } ,
        } ,
        //计算属性
        computed : {
            ismove () {
                if ( this.notype == globalconstant.notype.move ) {
                    return true;
                }
                return false;
            } ,
            issale () {
                if ( this.notype == globalconstant.notype.sale ) {
                    return true;
                }
                return false;
            } ,
            isscrap () {
                if ( this.notype == globalconstant.notype.scrap ) {
                    return true;
                }
                return false;
            } ,
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
